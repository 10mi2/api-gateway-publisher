
.PHONY: build
build: 
	# Clean the existing dist directory to ensure we get the latest
	rm -rf dist
	mkdir dist
	cp src/index.html dist/index.html

	# Install and bundle the UI in the dist directory
	npm i
	# webpack
	# This will parse the config doc and download the swagger json files to correct directory
	# It is expected that you have properly configured access to your AWS environment
	node scripts/fetch-api-gateway-swagger.js

.PHONY: deploy
deploy: build
	# Deploy the cloudformation stack
	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file cloudformation.yaml \
		--stack-name api-gateway-publisher \
		--parameter-overrides "Domain=$(DOMAIN)"
