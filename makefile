.DEFAULT_GOAL := run

SHELL := /bin/bash

GithubID = Magana
RepoName = roadtripr
SHA 	 = TODO

githubid:
	@echo "${GithubID}"

reponame:
	@echo "${RepoName}"

sha:
	@echo "${SHA}"

# make issues   - prints link to current phase's issues
issues:
	@echo "http://www.github.com/${GithubID}/${RepoName}/issues"

# make stories  - prints link to current phase's stories
stories:
	@echo "http://www.github.com/${GithubID}/${RepoName}/projects/1"

# make github   - prints link to github repo
github:
	@echo "http://www.github.com/${GithubID}/${RepoName}"

# make selenium - runs selenium tests
selenium:
	python app-react/tests/frontend/tests.py

# make mocha - runs mocha tests
mocha:
	@echo "Nothing to see here, move along."

# make backend  - runs backend tests
.PHONY: backend
backend:
	python backend/tests.py

# make postman  - runs postman tests with newman
postman:
	newman run Postman.json

# make website  - prints link to a website
website:
	@echo "http://roadtripr.fun/"

# make report   - prints link to technical report
report:
	@echo "https://huangyvonnee.gitbooks.io/roadtripr/content/"

# make apidoc   - prints link to api documentation
apidoc:
	@echo "https://huangyvonnee.gitbooks.io/roadtripr/content/restful-api.html"


run: update
	source venv/bin/activate; \
	python3 app/api.py; \

fast:
	source venv/bin/activate; \
	python3 app/api.py; \

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
	source venv/bin/activate; \
	pip3 install -r requirements.txt; \
	pip3 list; \
