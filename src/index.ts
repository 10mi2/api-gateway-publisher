import * as response from 'cfn-response';
import { CloudFormationCustomResourceEventCommon, Callback, Context } from "aws-lambda";

import { load_openapi_config, update_openapi_config } from './services/docs.service';
import { S3Service } from './services/s3.service';

const SITE_BUCKET = process.env.SITE_BUCKET

/**
 * Handles Uploading the S3 file, cleaning it and uploading it
 * This assumes happy path in many ways, but is a start
 */
exports.handler = async (event: CloudFormationCustomResourceEventCommon, context: Context, callback: Callback) => {
  try {
    const key = event.ResourceProperties.DefinitionKey
    const config = await load_openapi_config()

    const incomingSpec = JSON.parse(event.ResourceProperties.DefinitionBody)
    
    // Add the key and upload the file
    const incomingSpecPath = `services/${key}.json`
    S3Service.upload(SITE_BUCKET, incomingSpecPath, JSON.stringify(incomingSpec), 'application/json')
    config.urls.push({
      name: key,
      url: incomingSpecPath
    })

    // Dedupe services in the config
    const serviceHash = {}
    config.urls.forEach(service => serviceHash[service.name] = service)
    config.urls = Object.keys(serviceHash).map(s => serviceHash[s])

    await update_openapi_config(config)
  
    // Upload the output results
    // await S3Service.upload(SITE_BUCKET, siteSpecPath, Buffer.from(JSON.stringify(api), 'utf-8'))
    response.send(event, context, response.SUCCESS, null)
  } catch (err) {
    console.log('got to the error state even though I am about to call it successful')
    console.log(err)
    response.send(event, context, response.SUCCESS, null)
  }
}
