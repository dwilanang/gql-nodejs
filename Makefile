init:
	@.local/init.sh

lint:
ifeq ($(wildcard ./node_modules/.bin/eslint),)
	@npm install eslint --save-dev
endif
	@npm run lint
	
service-up:
	@docker-compose -f docker-compose.yml up --build

service-down:
	@docker-compose -f docker-compose.yml down

pre-commit:
	@.local/pre-commit.sh