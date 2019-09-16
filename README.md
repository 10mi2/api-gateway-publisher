# api-gateway-publisher
Publish your API Gateway Microservice Swagger documentation to users who you don't want logging in to your aws console.  Creates a Swagger UI front end and a dropdown for each service you configure.

## What is this tool for
The API Gateway can import and export swagger documents to utilize for internal routing and documenations.  This tool takes the export of api gateway swagger json files and packages them with a swagger UI along with a cloudformation template to publish a static website of your documentation.

## Config requirements
You will need to add the following to the `config.json`:
- The API Gateway ID for each api you want to publicly document,
- The Name you want to display in the dropdown in the UI
- The stage you want to export from your api.  (Default is v1)

## Notes for later
- Add a cron like experience.  Assume docs are published to the most recent from the api side, and re upload every night depending on user config
- Add to the API Example a way to poll the current version and make that what gets published so we have a code to service to documentation connection
- Some pipeline event to trigger the next build.


## To Run

### Pre Requisites
- Need to have aws cli configured to access you AWS environment - [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

### Commands to run
- Add your api gateway IDs and short names to the config file.
- `npm run build`
- `npm run deploy`

## Other projects that helped to make this possible
- [Swagger UI in one page](https://github.com/sunnyagarwal008/setup-swagger-ui-in-one-page/blob/master/swagger-ui.html)
- [Open API / Swagger](https://github.com/swagger-api/swagger-ui)
- [How to publish your own swagger to a microservice](still need to get the link)
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
