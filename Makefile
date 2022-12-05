init:
	@.local/init.sh

lint:
	@which eslint 2> /dev/null || echo "please install eslint : npm install eslint --save-dev"
	@npm run lint

service-up:
	@docker-compose -f docker-compose.yml up --build

service-down:
	@docker-compose -f docker-compose.yml down

pre-commit:
	@.local/pre-commit.sh