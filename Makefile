ifeq ($(PARENT_DOMAIN),)
PARENT_DOMAIN=$(DOMAIN)
endif

.PHONY: test
test:
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
	cp ui/openapi.json dist/ui/openapi.json

	tsc
	npm prune --production
	cp -r node_modules dist/src

.PHONY: local
local: build
	sam local invoke -e events/create_event.json DocsDeployFunction --env-vars env.json

.PHONY: deploy
deploy: build
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
		--parameter-overrides "ParentDomain=$(PARENT_DOMAIN)" "Domain=$(DOMAIN)" "HostedZoneId=$(HOSTED_ZONE_ID)"

	aws s3 sync dist/ui/ s3://docs.$(DOMAIN) --delete

.PHONY: teardown
teardown:
	aws cloudformation delete-stack --stack-name $(STACK_NAME)