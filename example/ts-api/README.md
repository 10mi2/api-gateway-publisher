# Javascript API with Swagger Example
This example builds a very simple javascript API Gateway Lambda example using AWS SAM.  Additionally there is an OpenAPI template with the correct include structure in the template to wire the aws integration functions.  The overall structure is ready and usable to add to the config for the microservices output structure.

## Steps needed to have this show up properly in our docs site
- Build the API Gateway Service
- Add the OpenAPI spec to the 
- Create a new version of the API Documentation to ensure changes are reflected.

## Limitations
This example assumes you have a domain you are using. So the spec this example builds does not have a valid server as part of the spec.

## Helpful links and extra reading
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
- [AWS Example of a swagger document](https://github.com/awslabs/serverless-application-model/blob/develop/examples/2016-10-31/api_swagger_cors/swagger.yaml)