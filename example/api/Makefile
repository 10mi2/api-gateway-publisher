ifeq ($(VERSION),)
VERSION := 0.0.1
endif

ifeq ($(STACK_BUCKET),)
STACK_BUCKET := openapi-plumbing
endif

.PHONY: test
test:
	aws cloudformation validate-template --template-body file://template.yaml

.PHONY: clean
clean:
	rm -rf ./dist
	rm -rf template_deploy.yaml

.PHONY: deps
deps: clean
	go get github.com/aws/aws-lambda-go/events
	go get github.com/aws/aws-lambda-go/lambda

.PHONY: build
build: deps
	GOOS=linux go build -o dist/main ./src/main.go

.PHONY: api
api: build
	sam local start-api

.PHONY: deploy
deploy: build
	aws s3 cp ./openapi.yaml s3://$(STACK_BUCKET)/openapi-gateway-example-openapi.yaml

	aws cloudformation package \
		--template-file template.yaml \
		--output-template template_deploy.yaml \
		--s3-bucket $(STACK_BUCKET)

	aws cloudformation deploy \
		--no-fail-on-empty-changeset \
		--template-file template_deploy.yaml \
		--stack-name openapi-gateway-example \
		--parameter-overrides "PlumbingBucket=$(STACK_BUCKET)" \
		--capabilities CAPABILITY_IAM

	# Publish a new version of the documentation for this api
	aws apigateway create-documentation-version \
		--rest-api-id $(shell aws cloudformation describe-stacks --stack-name openapi-gateway-example --query "Stacks[0].Outputs[?OutputKey == 'ServiceApiId'].OutputValue" --output text) \
		--documentation-version $(VERSION) \
		--stage-name v1

.PHONY: teardown
teardown:
	aws cloudformation delete-stack --stack-name openapi-gateway-example
