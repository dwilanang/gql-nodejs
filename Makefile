service-up:
	@echo "Starting the service - $$(date)"
	@docker-compose -f docker-compose.yml up --build
service-down:
	@docker-compose -f docker-compose.yml down
