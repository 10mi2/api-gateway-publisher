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


## Lessons Learned in building the examples.
Remember that the swagger is both an input and an output.  The dream is to define the spec and have the api built automagically.  The real world is far from this ideal, but nevertheless OpenAPI persists. This is confusing and unnecessary in the end, but it's the world of swagger. So AWS has a lot of requirements for the input to swagger that are not part of the output.  But if you leave them out, then you will end up chasing your tail for a **LONG** time.  Even though you elsewhere define authorization.  If you don't duplicate that information in the Open API Spec.  The **WHOLE** api will fail! Not just Auth, not just in swagger. Failure to include the Authorization Integration info in the swagger document AND the Template complete with Cognito ID information will brick the whole thing.  What's more is you won't get an error that remotely resembles what has happened. Just `Unauthorized`.  I lost two days of my life chasing this.  Please learn from my pain.


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
