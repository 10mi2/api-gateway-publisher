# api-gateway-publisher
Publish your API Gateway Microservice Swagger documentation to users who you don't want logging in to your aws console.  Creates a Swagger UI front end and a dropdown for each service you configure.

AWS API Gateways have an integration for defining API actions through Open API / Swagger config specs.  The current integration for these documents is all internal to the AWS console.  If you have publicly facing micro services, it is currently impossible to share interactive api documentation wtih the outside world.  This tool will import your environment from the configuration and your configured AWS cli access credentials and build a static site containing your swagger documentation in a boilerplate Swagger GUI.  There is also code to deploy this static content to a public website hosted on AWS using S3 and Cloudfront.  Further configuration can be added to create route53 routes to https://docs.<your_domain> to publicly expose an api catalogue portal to the outside world.

## What is this tool for
The API Gateway can import and export swagger documents to utilize for internal routing and documenations.  This tool takes the export of api gateway swagger json files and packages them with a swagger UI along with a cloudformation template to publish a static website of your documentation.

## Config requirements
You will need to add the following to the `config.json`:
- The API Gateway ID for each api you want to publicly document,
- The Name you want to display in the dropdown in the UI
- The stage you want to export from your api.  (Default is v1)

## To Run

### Pre Requisites
- Need to have aws cli configured to access you AWS environment - (link)[https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html]

### Commands to run
- Add your api gateway IDs and short names to the config file.
- `npm run build`
- `npm run deploy`

## Other projects that helped to make this possible
- (Swagger UI in one page)[https://github.com/sunnyagarwal008/setup-swagger-ui-in-one-page/blob/master/swagger-ui.html]
- (Open API / Swagger)[https://github.com/swagger-api/swagger-ui]
- (How to publish your own swagger to a microservice)[still need to get the link]
