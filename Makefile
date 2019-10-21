
.PHONY: clean
clean:
	rm -rf dist
	rm -rf template_deploy.yaml

.PHONY: build
build: clean
	# Clean the existing dist directory to ensure we get the latest
	mkdir dist
	cp ui/index.html dist/index.html
	echo '{"urls":[]}' > dist/swagger-config.json

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

	aws s3 sync dist/ s3://docs.$(DOMAIN) --delete
