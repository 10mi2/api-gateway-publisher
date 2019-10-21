
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
	echo '{"urls":[]}' > dist/ui/swagger-config.json
	
	tsc
	npm prune --production
	cp -r node_modules dist/src

.PHONY: deploy
deploy: build
	aws cloudformation package \
		--template-file template.yaml \
		--output-template template_deploy.yaml \
		--s3-bucket $(STACK_BUCKET)

	# Deploy the cloudformation stack
	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file template.yaml \
		--stack-name $(STACK_NAME) \
		--parameter-overrides "Domain=$(DOMAIN)" "HostedZoneId=$(HOSTED_ZONE_ID)"

	aws s3 sync dist/ui/ s3://docs.$(DOMAIN) --delete
