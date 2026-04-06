# Makefile for Weekly Hits Project

# Default target
.DEFAULT_GOAL := help

# Python and manage.py path
PYTHON := python3
MANAGE := $(PYTHON) manage.py

help:
	@echo "Weekly Hits - Usage:"
	@echo "  make install        - Install Python dependencies"
	@echo "  make run            - Start the Django development server"
	@echo "  make migrate        - Apply database migrations"
	@echo "  make makemigrations - Create new migrations based on model changes"
	@echo "  make seed           - Populate database with sample data"
	@echo "  make shell          - Open Django shell"
	@echo "  make superuser      - Create a superuser"
	@echo "  make run-frontend   - Start the React frontend"
	@echo "  make test           - Run tests"

install:
	pip install -r requirements.txt

run:
	$(MANAGE) runserver

migrate:
	$(MANAGE) migrate

makemigrations:
	$(MANAGE) makemigrations

seed:
	$(PYTHON) seed_data.py

shell:
	$(MANAGE) shell

superuser:
	$(MANAGE) createsuperuser

run-frontend:
	cd web/ && npm run start

test:
	$(MANAGE) test