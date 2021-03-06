# API-Gateway-publisher
Publish your API Gateway Microservice Swagger documentation to users who you don't want logging in to your aws console.  I would love suggestions or other contributions.

## What is this tool for
This creates an interactive documentation site to host the OpenAPI website at `docs.<your domain>`.

There are three ways to deploy using Cloudformation:
- Provide the DefinitionBody directly to the DocsDeployment function
    - Deployments will happen every time you deploy the cloudformation template and the API spec has changed
- Import the API Gateway spec via API Gateway.
- Point your Docs site to the hosted OpenAPI.json spec elsewhere (See `petstore` example)

All of these use cases use Cloudformation / AWS SAM for deployment through a CustomResource lambda function.

## No Config updating necessary
The custom resource is self registering and accepts a push at build / update / delete time from your API Gateway Template.  The custom deployment function runs every time the input parameters being sent to it have changed at deployment time.

# Ongoing things to be done
- Improve the UI.
  - Currently the UI is swagger UI boilerplate.  Ideally we should wrap some front end frameworks and ensure we can use this in a more customized front end application.
- Improve the docs site config so we can have one OpenAPI spec instead of a list of them if you choose.

# How to use this tool

## Pre Requisites
- Need to have aws cli configured to access you AWS environment - [link](https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html)

## Set the following environment variables:
- STACK_NAME
- STACK_BUCKET
    - Used by Sam to upload your lambda code to
- PARENT_DOMAIN
    - I put this here to be your top level domain
    - I'm assuming that many will have environments are part of the `DOMAIN` and I wanted the ability to still register certificates to the parent
- DOMAIN
    - The DNS record for you docs site will be at `docs.<DOMAIN>`
- HOSTED_ZONE_ID
    - The ID of the domain you want to create `docs.<your domain>` to.

## Run the following commands
- `make test`
    - Validates the template
- `make build`
    - Creates assets and compiles Typescript code
- `make deploy`
    - This will likely take 45-60 minutes as it's building the Cloudfront Distribution the first time.
        - Updates will not take so long so long as you aren't changing the CloudFront Distribution.
    - You will also need to have access to the Certificate AWS email addresses.  Keep an eye out for an email to these addresses and ensure you approve in a timely manner.
        - administrator@your_domain_name
        - hostmaster@your_domain_name
        - postmaster@your_domain_name
        - webmaster@your_domain_name
        - admin@your_domain_name

## How to publish a service to your site

## Publish by passing OpenAPI DefinitionBody
See the examples, but generally you add a customResource that uploads your OpenAPI through the DefinitionBody Parameter.

Required Parameters:
- DefinitionKey
- DefinitionBody

This service will deploy the new OpenApi spec every time you update your service template and there are changes to your OpenAPI spec.  This will also delete the Service spec if / when you delete the template.

## Publish using AWS API Gateway Export
Alternatively, you can get an export of your API Gateway OpenAPI spec using the AWS integration at deploy time.  Right now there is a race condition in the current examples `aws-ts-api` and `auth`.  Currently after a successful deployment, there is a command that runs to export the API from API Gateway.  This is what is used in the DocsDeployment Custom Resource function, but is not available until after the first complete deployment.  The hack way around this race condition for now is to deploy, then tick up the package.json version and deploy again.  I am open to suggestions here.

Required Paramters:
- DefinitionKey
- APIVersion
    - This is not used in the publishing, but is instead an incrementer to communicate that the underlying doc has changed.
- APIGatewayId
- APIGatewayStage
## Publish by hosting the OpenAPI Spec elsewhere and just pointing to it.
Sometimes the OpenAPI spec is hosted with the api.  If this is the case for you, you can just add that url to the Swagger UI config through the custom resource.

Required Parameters:
- DefinitionKey
- OpenAPIUrl

The custom Resource will add that url to the Swagger UI config and make it accessible on the UI in the same dropdown as the other services.

# Other projects that helped to make this possible
- [Open API / Swagger](https://github.com/swagger-api/swagger-ui)
- [Swagger UI in one page](https://github.com/sunnyagarwal008/setup-swagger-ui-in-one-page/blob/master/swagger-ui.html)
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
