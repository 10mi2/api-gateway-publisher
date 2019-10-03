# api-gateway-publisher
Publish your API Gateway Microservice Swagger documentation to users who you don't want logging in to your aws console.  Creates a Swagger UI boilerplate front end and a dropdown for each service you configure.

## What is this tool for
The API Gateway can import and export swagger documents to utilize for internal routing and documenations.  This tool takes the export of api gateway swagger json files and packages them with a swagger UI along with a cloudformation template to publish a static website of your documentation.

## Config requirements
There are three ways to define an OpenAPI spec you want included in your docs service:
- By Cloudformation Stack Name and ApiGateway LogicalName (See Example)
- By API Gateway ID
- By Hosted URL source

### Examples:
```json
[
  {
    "stackName": "<Name of the Cloudformation stack>",
    "apiLogicalResourceName": "<Name of the API Gateway key in the Cloudformation Yaml File>",
    "stageName": "<Api Gateway Stage Name>",
    "name": "<Name of the service and what you want to show up in the dropdown>"
  },
  {
    "id": "<Api Gateway ID>",
    "stageName": "<Api Gateway Stage Name>",
    "name": "<Name of the service and what you want to show up in the dropdown>"
  },
  {
    "url": "<Hosted Location of service openAPI Document> E.G. `https://petstore.swagger.io/v2/swagger.json`",
    "name": "<Name of the service and what you want to show up in the dropdown>"
  }
]
```

## Ongoing things to be done
- Improve the UI.
  - Currently the UI is swagger UI boilerplate.  Ideally we should wrap some front end frameworks and ensure we can use this in a more customized front end application.
- Improve build schedule.
  - We should build out a cron type experience in updating the version documentation.
  - Integrate some kind of CI/CD to allow for easier building based on events

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
