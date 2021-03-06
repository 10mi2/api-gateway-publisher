ifeq ($(VERSION),)
VERSION := 0.0.1
endif

ifeq ($(STACK_BUCKET),)
STACK_BUCKET := openapi-plumbing
endif

ifeq ($(STACK_NAME),)
STACK_NAME := go-apigateway
endif

.PHONY: test
test:
	aws cloudformation validate-template --template-body file://template.yaml

.PHONY: clean
clean:
	@rm -rf ./dist
	@rm -rf template_deploy.yaml

.PHONY: deps
deps: clean
	@go get github.com/aws/aws-lambda-go/events
	@go get github.com/aws/aws-lambda-go/lambda

.PHONY: build
build: deps
	@GOOS=linux go build -o dist/main ./src/main.go

.PHONY: api
api: build
	sam local start-api


.PHONY: deploy
deploy:
	@aws s3 cp ./openapi.yaml s3://$(STACK_BUCKET)/$(STACK_NAME)-openapi.yaml

	@aws cloudformation package \
		--template-file template.yaml \
		--output-template template_deploy.yaml \
		--s3-bucket $(STACK_BUCKET)

	@aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file template_deploy.yaml \
		--stack-name $(STACK_NAME) \
		--parameter-overrides "PlumbingBucket=$(STACK_BUCKET)" \
		--capabilities CAPABILITY_IAM

.PHONY: teardown
teardown: clean
	@aws cloudformation delete-stack --stack-name $(STACK_NAME)
