.DEFAULT_GOAL := run

SHELL := /bin/bash

run:
	source ../venv/bin/activate; \
	python3 hello.py; \

clean:
	rm -f  .coverage
	rm -f  .pylintrc
	rm -f  *.pyc
	rm -f  *.tmp
	rm -rf __pycache__
	rm -rf .mypy_cache

.pylintrc:
	pylint --disable=locally-disabled --reports=no --generate-rcfile > $@

pylint: .pylintrc
	-pylint *.py

format:
	autopep8 -i *.py

update:
	source ../venv/bin/activate; \
	pip3 install -r ../requirements.txt; \
	pip3 list; \
