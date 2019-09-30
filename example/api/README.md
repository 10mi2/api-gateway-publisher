# API with Swagger Example
This example builds a very simple api and has a construct template using AWS SAM.  I added a swagger document to the API spec so we get more than just the method and path.

## Steps needed to have this show up properly in our docs site
- Build the API Gateway Service
- Add the OpenAPI spec to the 
- Create a new version of the API Documentation to ensure changes are reflected.

## Helpful links and extra reading
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
- [AWS Example of a swagger document](https://github.com/awslabs/serverless-application-model/blob/develop/examples/2016-10-31/api_swagger_cors/swagger.yaml)