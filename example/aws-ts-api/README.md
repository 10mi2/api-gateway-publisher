# Javascript API with Swagger Example
This example builds a very simple javascript API Gateway Lambda example using AWS SAM.  Additionally there is an OpenAPI template with the correct include structure in the template to wire the aws integration functions.  The overall structure is ready and usable to add to the config for the microservices output structure.

## A note of warning
Using the OpenAPI Spec within AWS creates a very subtle need to ensure all lambda values are present and that all integrations are present. Failure to do so, or a mismatched variable name anywhere will successfully build and deploy, but the api will not respond to any request and will give unhelpful error messages.

## Steps needed to have this show up properly in our docs site
- Build the API Gateway Cloudformation infrastructure.
- Create a new version of the API Documentation to ensure changes are reflected.

## Helpful links and extra reading
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
- [AWS Example of a swagger document](https://github.com/awslabs/serverless-application-model/blob/develop/examples/2016-10-31/api_swagger_cors/swagger.yaml)