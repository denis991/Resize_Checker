// Типы
interface ResponsiveCheckerConfig {
  defaultWidth: number;
  iframeSelector: string;
  selectSelector: string;
  customInputSelector: string;
  sourceInputSelector: string;
  goButtonSelector: string;
}

// Конфигурация
const CONFIG: ResponsiveCheckerConfig = {
  defaultWidth: 768,
  iframeSelector: '#preview-frame',
  selectSelector: '#breakpoint-select',
  customInputSelector: '#custom-breakpoint',
  sourceInputSelector: '#input-source',
  goButtonSelector: '#go-button'
};

// Класс для управления приложением
class ResponsiveChecker {
  private iframe!: HTMLIFrameElement;
  private select!: HTMLSelectElement;
  private customInput!: HTMLInputElement;
  private sourceInput!: HTMLTextAreaElement;
  private goBtn!: HTMLButtonElement;

  constructor() {
    this.initializeElements();
    this.bindEvents();
    this.initializeApp();
  }

  private initializeElements(): void {
    this.iframe = document.querySelector(CONFIG.iframeSelector) as HTMLIFrameElement;
    this.select = document.querySelector(CONFIG.selectSelector) as HTMLSelectElement;
    this.customInput = document.querySelector(CONFIG.customInputSelector) as HTMLInputElement;
    this.sourceInput = document.querySelector(CONFIG.sourceInputSelector) as HTMLTextAreaElement;
    this.goBtn = document.querySelector(CONFIG.goButtonSelector) as HTMLButtonElement;

    if (!this.iframe || !this.select || !this.customInput || !this.sourceInput || !this.goBtn) {
      throw new Error('Required DOM elements not found');
    }
  }

  private bindEvents(): void {
    this.select.addEventListener('change', () => this.setWidth(Number(this.select.value)));

    this.customInput.addEventListener('input', () => {
      const value = parseInt(this.customInput.value);
      if (value > 0) this.setWidth(value);
    });

    this.goBtn.addEventListener('click', () => this.loadContent());

    // Добавляем поддержку Enter в textarea
    this.sourceInput.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        this.loadContent();
      }
    });
  }

  private initializeApp(): void {
    this.setWidth(Number(this.select.value) || CONFIG.defaultWidth);
  }

  private setWidth(px: number): void {
    if (px <= 0) return;
    this.iframe.style.width = `${px}px`;

    // Добавляем визуальную обратную связь
    this.iframe.style.transition = 'width 0.3s ease';
  }

  private async loadContent(): Promise<void> {
    const content = this.sourceInput.value.trim();

    if (!content) {
      this.showError('Введите URL или HTML');
      return;
    }

    try {
      this.goBtn.disabled = true;
      this.goBtn.textContent = 'Загрузка...';

      if (this.isUrl(content)) {
        await this.loadUrl(content);
      } else {
        this.loadHtml(content);
      }
    } catch (error) {
      this.showError(`Ошибка загрузки: ${error instanceof Error ? error.message : 'Неизвестная ошибка'}`);
    } finally {
      this.goBtn.disabled = false;
      this.goBtn.textContent = 'Go';
    }
  }

  private isUrl(content: string): boolean {
    try {
      new URL(content);
      return true;
    } catch {
      return false;
    }
  }

  private async loadUrl(url: string): Promise<void> {
    this.iframe.src = url;
  }

  private loadHtml(html: string): void {
    const doc = this.iframe.contentDocument;
    if (!doc) {
      throw new Error('Не удалось получить доступ к iframe');
    }

    doc.open();
    doc.write(html);
    doc.close();
  }

  private showError(message: string): void {
    // Создаем красивое уведомление об ошибке
    const notification = document.createElement('div');
    notification.style.cssText = `
      position: fixed;
      top: 20px;
      right: 20px;
      background: #ff4444;
      color: white;
      padding: 1rem;
      border-radius: 8px;
      box-shadow: 0 4px 12px rgba(0,0,0,0.15);
      z-index: 1000;
      max-width: 300px;
      animation: slideIn 0.3s ease;
    `;

    notification.textContent = message;
    document.body.appendChild(notification);

    setTimeout(() => {
      notification.style.animation = 'slideOut 0.3s ease';
      setTimeout(() => notification.remove(), 300);
    }, 3000);
  }
}

// Инициализация приложения
document.addEventListener('DOMContentLoaded', () => {
  try {
    new ResponsiveChecker();
  } catch (error) {
    console.error('Ошибка инициализации приложения:', error);
  }
});