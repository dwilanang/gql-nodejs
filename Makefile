init:
	@.local/init.sh

lint:
ifeq ($(wildcard ./node_modules/.bin/eslint),)
	@echo install eslint
	@npm install eslint --save-dev
endif
	@npm run lint
	
services-up:
	@docker-compose -f docker-compose.yml up --build

services-down:
	@docker-compose -f docker-compose.yml down

pre-commit:
	@.local/pre-commit.sh

#$(PROJECT_NODE) = add `export PROJECT_NODE=[my path nodejs]` in .zshrc/.bash_profile`
ut:
ifeq ($(wildcard ./node_modules/.bin/jest),)
	@echo install jest
	@npm install jest --save-dev
	@watchman watch-del '$(PROJECT_NODE)/dxlbuilder' ; watchman watch-project '$(PROJECT_NODE)/dxlbuilder'
endif
	@npm test -- -u --coverage --silent --coverageReporters="json-summary"

coba:
	@.local/test.sh