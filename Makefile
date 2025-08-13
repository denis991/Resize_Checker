# Makefile для Resize Checker
#
# Быстрые команды для сборки, разработки, запуска, линтинга и форматирования
#
# Основные цели:
#   make build           - Полная сборка (очистка, компиляция TS и SCSS)
#   make build-single    - Собрать standalone HTML (минифицированный index.html со всеми включениями)
#   make dev             - Запуск сервера разработки Vite
#   make preview         - Предпросмотр собранного проекта
#   make watch           - Watch-режим для быстрой разработки (TS и SCSS)
#   make clean           - Очистить папку dist
#   make lint            - Проверка кода ESLint
#   make lint-fix        - Автоисправление ошибок ESLint
#   make format          - Форматирование кода Prettier
#   make serve           - Локальный сервер для production-сборки
#
.PHONY: build build-ts build-scss build-standalone build-single preview watch watch-ts watch-scss clean dev serve lint lint-fix format all

# Полная сборка: очистка, компиляция TS и SCSS
build: clean build-ts build-scss

# Компиляция TypeScript
build-ts:
	yarn run build:ts

# Компиляция SCSS в CSS
build-scss:
	yarn run build:scss

# Сборка production-версии через Vite
build-standalone:
	yarn run build:standalone

# Сборка standalone HTML (минифицированный index.html со всеми включениями)
build-single:
	yarn run build:single

# Предпросмотр production-сборки
preview:
	yarn run preview

# Watch-режим для быстрой разработки (TS и SCSS)
watch: watch-ts watch-scss

# Watch только TypeScript
watch-ts:
	yarn run watch:ts

# Watch только SCSS
watch-scss:
	yarn run watch:scss

# Очистить папку dist
clean:
	yarn run clean

# Запуск сервера разработки Vite
dev:
	yarn run dev

# Локальный сервер для production-сборки
serve:
	yarn run serve

# Проверка кода ESLint
lint:
	yarn run lint

# Автоисправление ошибок ESLint
lint-fix:
	yarn run lint:fix

# Форматирование кода Prettier
format:
	yarn run format

# Универсальная команда для полной сборки, минификации, обфускации и защиты
all: build minify obfuscate protect

# -----------------------------------------------------
CONFIG = build.config.json
SRC_DIR = $(shell jq -r .srcDir $(CONFIG))
OUT_DIR = $(shell jq -r .outDir $(CONFIG))
HTML = $(shell jq -r .html $(CONFIG))
JS_FILES = $(shell jq -r '.js[]' $(CONFIG))
CSS_FILES = $(shell jq -r '.css[]' $(CONFIG))

.PHONY: build minify obfuscate protect clean

build:
	@echo "Сборка проекта..."
	mkdir -p $(OUT_DIR)
	@for f in $(shell jq -r '.html[]' $(CONFIG)); do cp $(SRC_DIR)/$$f $(OUT_DIR)/; done
	@for f in $(shell jq -r '.js[]' $(CONFIG)); do cp $(SRC_DIR)/$$f $(OUT_DIR)/; done
	@for f in $(shell jq -r '.css[]' $(CONFIG)); do cp $(SRC_DIR)/$$f $(OUT_DIR)/; done

# Универсальная минификация HTML, CSS, JS
minify:
	@echo "Минификация HTML, CSS, JS..."
	@for f in $(shell jq -r '.html[]' $(CONFIG)); do \
		html-minifier-terser $(OUT_DIR)/$$f -o $(OUT_DIR)/$$f --collapse-whitespace --remove-comments --minify-js true --minify-css true; \
	done
	@for f in $(shell jq -r '.js[]' $(CONFIG)); do \
		terser $(OUT_DIR)/$$f -o $(OUT_DIR)/$$f --compress --mangle; \
	done
	@for f in $(shell jq -r '.css[]' $(CONFIG)); do \
		cleancss -o $(OUT_DIR)/$$f $(OUT_DIR)/$$f; \
	done

# Универсальная обфускация JS
obfuscate:
	@echo "Обфускация JS..."
	@for f in $(shell jq -r '.js[]' $(CONFIG)); do \
		javascript-obfuscator $(OUT_DIR)/$$f --output $(OUT_DIR)/$$f; \
	done

# Универсальная защита HTML от копирования
protect:
	@echo "Добавление защиты от копирования..."
	@for f in $(shell jq -r '.html[]' $(CONFIG)); do \
		node protect-html.js $(OUT_DIR)/$$f; \
	done

clean:
	rm -rf $(OUT_DIR)