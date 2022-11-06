# init:
# 	@echo "Starting the service - $$(date)"
# 	@docker build --tag dxlbuilder .
# 	@docker tag dxlbuilder:latest dxlbuilder:v1.0.0
	
# run:
# 	@docker run --publish 4000:4000 dxlbuilder

# stop:
# 	@docker run --publish 4000:4000 dxlbuilder
start:
	@echo "Starting the service - $$(date)"
	@docker-compose -f docker-compose.yml up --build

stop:
	@docker-compose -f docker-compose.yml down
