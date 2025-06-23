# Makefile для сборки и разработки

.PHONY: build watch clean

# Компиляция TS и SCSS
build:
	yarn run build

# Watch-режим для быстрой разработки
watch:
	yarn run watch

# Удалить папку dist
clean:
	yarn run clean