# Authenticated API with Auth using Swagger Example
A more detailed explanation of the cognito authorizer is [here](https://tenmilesquare.com/aws-sam-api-with-cognito/).

This example builds a very simple api Gateway with authentication using Cognito.  There is a SAM Template to handle deployment of the cognito pool and api gateway using SAM.  I added a swagger document to the API spec so we end up with a documented api that is published and ready for a build using the parent project.

## To run
- Set the following environment variables
  - YOUR_EMAIL (The template will create a user at this email and send you a temp password)
    - This template won't run unless this variable is set.
  - STACK_BUCKET (this bucket must exist in your AWS environment)
- run `npm run deploy`
- run `./scripts/login_first.sh {{User Pool ID}} {{User Pool Client ID}} {{Your Email}} {{Temp password that was sent to you}}`
  - Get the first two values from the cloudformation outputs dashboard
- run `curl {{Url to your api}}/echo/{{any word you want said back to you}}`
  - Will work before logging in
- Add the given Authorization token to the OpenAPI `Authorize` Dialog and run the auth method after you have logged in

## Steps needed to have this show up properly in our docs site
- Build the API Gateway Service
- Add the OpenAPI spec to the config in the parent project by name or by API ID
- Create a new version of the API Documentation to ensure changes are reflected.

## Helpful links and extra reading
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
- [AWS Example of a swagger document](https://github.com/awslabs/serverless-application-model/blob/develop/examples/2016-10-31/api_swagger_cors/swagger.yaml)
