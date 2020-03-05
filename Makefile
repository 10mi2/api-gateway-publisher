# DOMAIN environment variable is required
all: build test validate deploy

.PHONY: test
test:
	npm run test

.PHONY: validate
validate:
	aws cloudformation validate-template --template-body file://template.yaml

.PHONY: clean
clean:
	rm -rf dist
	rm -rf template_deploy.yaml

.PHONY: build
build: clean
	npm i
	# Clean the existing dist directory to ensure we get the latest
	mkdir -p dist/ui
	cp ui/index.html dist/ui/index.html

	npm run transpile
	npm prune --production
	cp -r node_modules dist/src/
	npm i

.PHONY: local
local: build
	sam local invoke -e events/create_event.json DocsDeployFunction --env-vars env.json

.PHONY: deploy_cloudformation
deploy_cloudformation:
	aws cloudformation package \
		--template-file template.yaml \
		--output-template template_deploy.yaml \
		--s3-bucket $(STACK_BUCKET)

	# Deploy the cloudformation stack
	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file template_deploy.yaml \
		--stack-name $(STACK_NAME) \
		--capabilities CAPABILITY_IAM \
		--parameter-overrides "Domain=$(DOMAIN)" "HostedZoneId=$(HOSTED_ZONE_ID)"

.PHONY: upload
upload:
	aws s3 sync dist/ui/ s3://docs.$(DOMAIN)
	$(eval CLOUDFRONT_ID=$(shell aws cloudformation describe-stack-resources --stack-name $(STACK_NAME) --logical-resource-id Cloudfront --query "StackResources[0].PhysicalResourceId" --output text))
	aws cloudfront create-invalidation --distribution-id $(CLOUDFRONT_ID) --paths /*

.PHONY: deploy
deploy: deploy_cloudformation upload

.PHONY: teardown
teardown:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)