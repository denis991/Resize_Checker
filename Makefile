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
.PHONY: build build-ts build-scss build-standalone build-single preview watch watch-ts watch-scss clean dev serve lint lint-fix format

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
