# API-Gateway-publisher
Publish your API Gateway Microservice Swagger documentation to users who you don't want logging in to your aws console.  I would love suggestsions or other contributions.

## What is this tool for
This creates an interactive documentation site to host the OpenAPI website at `docs.<your domain>`.  You can import the provided custom resource to your Cloudformation or SAM template and pass your OpenAPI spec.  The custom resource uploads your DefinitionBody to the docs S3 Bucket and updates the config so users can see your api endpoints.  The custom resource will update when you redeploy your API Gateway Template, and will remove the service if you delete your template.  The current version accepts the DefinitionBody parameter containing the full OpenAPI spec.  Future versions will include mechanisms to import the spec directly from your API Gateway Definition Body as Published through the API gateway API / CLI.

## No Config updating necessary
The custom resource is self registering and accepts a push at build / update / delete time from your API Gateway Tempalte.

# Ongoing things to be done
- Improve the UI.
  - Currently the UI is swagger UI boilerplate.  Ideally we should wrap some front end frameworks and ensure we can use this in a more customized front end application.
- Improve the docs site config so we can have one OpenAPI spec instead of a list of them if you choose.
- Include a mechanism to fetch the API Gateway Documentation via 
- Add examples that come from API Gateway direclty if you imported your Open API Spec.

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
- `make build`
- `make deploy`
    - This will likely take 45-60 minutes as it's building a Cloudfront.
        - Updates will not take so long so long as you aren't changing the CloudFront Distribution
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
Alternatively, you can get an export of your API Gateway OpenAPI spec using the AWS integration at deploy time.

Required Paramters:
    - DefinitionKey
    - APIGatewayId
    - APIGatewayStage
    <!-- TODO: Need to add incrementer or random value to ensure Docs runs each time for this -->

The custom Resource will download the contents of the OpenAPI Spec without the AWS integration docs via the getExport functionality in API Gateway.  This will also update when the template is updated, and will delete when the service template is removed.

# Other projects that helped to make this possible
- [Open API / Swagger](https://github.com/swagger-api/swagger-ui)
- [Swagger UI in one page](https://github.com/sunnyagarwal008/setup-swagger-ui-in-one-page/blob/master/swagger-ui.html)
- [A Link on how to publish the Swagger doc to your microservice](https://medium.com/@nabtechblog/integrating-swagger-with-aws-lambda-and-api-gateway-using-cloud-formation-macro-functions-7432dec50dd)
