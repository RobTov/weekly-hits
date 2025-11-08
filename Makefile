# Makefile for Django project

# Default target
.DEFAULT_GOAL := help

# Python and manage.py path
PYTHON := python3
MANAGE := $(PYTHON) manage.py

help:
	@echo "Usage:"
	@echo "  make run  - Start the Django development server"
	@echo "  make migrate  - Apply database migrations"
	@echo "  make makemigrations - Create new migrations based on model changes"
	@echo "  make shell	  - Open Django shell"
	@echo "  make test	- Run tests"
	@echo "  make superuser   - Create a superuser"

run:
	$(MANAGE) runserver

migrate:
	$(MANAGE) migrate

makemigrations:
	$(MANAGE) makemigrations

shell:
	$(MANAGE) shell

test:
	$(MANAGE) test
seed:
	$(MANAGE) seed artists --number=10 && $(MANAGE) seed songs --number=10

superuser:
	$(MANAGE) createsuperuser

run-frontend:
	cd web/ && npm run start