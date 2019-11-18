STACK_NAME=petstore-openapi-example

.PHONY: test
test:
	aws cloudformation validate-template --template-body file://cloudformation.yaml

.PHONY: deploy
deploy:
	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file cloudformation.yaml \
		--stack-name $(STACK_NAME)

.PHONY: teardown
teardown: clean
	aws cloudformation delete-stack --stack-name $(STACK_NAME)
