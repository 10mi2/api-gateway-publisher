import { send, SUCCESS } from 'cfn-response-async';
import { Callback, Context, CloudFormationCustomResourceEvent } from "aws-lambda";

import { load_openapi_config, update_openapi_config } from './services/docs.service';
import { S3Service } from './services/s3.service';
import { CloudfrontService } from './services/cloudfront.service';
import { APIGatewayService } from './services/apigateway.service';

export interface ResourceProperties {
  DefinitionKey: string
  DefinitionBody?: string
  APIVersion?: string
  APIGatewayId?: string
  APIGatewayStage?: string
  OpenAPIUrl?: string
}

const SITE_BUCKET = process.env.SITE_BUCKET

/**
 * Handles Uploading the S3 file, cleaning it and uploading it
 * This assumes happy path in many ways, but is a start
 */
exports.handler = async (event: CloudFormationCustomResourceEvent, context: Context, callback: Callback) => {
  try {
    const key = event.ResourceProperties.DefinitionKey
    const config = await load_openapi_config()
    const incomingSpecPath = `services/${key}.json`
    const resourceProperties: ResourceProperties = event.ResourceProperties as any

    switch(event.RequestType) {
      case 'Create':
      case 'Update':
        // Handle case where specification is hosted elsewhere by providing a direct and accessible URL to it
        if (resourceProperties.OpenAPIUrl !== undefined) {
          config.urls.push({
            name: key,
            url: resourceProperties.OpenAPIUrl
          })
        } else {
          let incomingSpec
          // Use the general sent value
          if (resourceProperties.DefinitionBody !== undefined) {
            incomingSpec = JSON.parse(event.ResourceProperties.DefinitionBody)
          }
          // Conditionally download the API Gateway export using the gatewayID
          else if (resourceProperties.APIGatewayId !== undefined) {
            await APIGatewayService.createDocumentationVersion(
              resourceProperties.APIGatewayId,
              resourceProperties.APIVersion,
              resourceProperties.APIGatewayStage
            )

            incomingSpec = JSON.parse(await APIGatewayService.getExport(
              resourceProperties.APIGatewayId,
              resourceProperties.APIGatewayStage
            ))

            // Clean the basePath Urls.
            incomingSpec = APIGatewayService.fixAwsNonsense(incomingSpec)
          }

          // Add the key and upload the file
          S3Service.upload(SITE_BUCKET, incomingSpecPath, JSON.stringify(incomingSpec), 'application/json')
          config.urls.push({
            name: key,
            url: incomingSpecPath
          })
        }

        // Dedupe services in the config
        const serviceHash = {}
        config.urls.forEach(service => serviceHash[service.name] = service)
        config.urls = Object.keys(serviceHash).map(s => serviceHash[s])
        break
      case 'Delete':
        await S3Service.delete(SITE_BUCKET, incomingSpecPath)
        const updatedUrls = config.urls.filter(url => url.name !== key)
        config.urls = updatedUrls
        break
    }

    await update_openapi_config(config)
    await CloudfrontService.createInvalidation(`/${incomingSpecPath}`, '/config.json')

    // Upload the output results
    await send(event, context, SUCCESS, null, 'DocsDeployCustomResource')
  } catch (err) {
    console.log('got to the error state even though I am about to call it successful')
    console.log(err)
    await send(event, context, SUCCESS, null, 'DocsDeployCustomResource')
  }
}
