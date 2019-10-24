import * as response from 'cfn-response';
import { CloudFormationCustomResourceEventCommon, Callback, Context } from "aws-lambda";

import { initializeSpec } from './openapi.service';
import { S3Service } from './s3.service';
const SITE_BUCKET = process.env.SITE_BUCKET

const siteSpecPath = 'openapi.json'


/**
 * Handles Uploading the S3 file, cleaning it and uploading it
 * This assumes happy path in many ways, but is a start
 */
exports.handler = async (event: CloudFormationCustomResourceEventCommon, context: Context, callback: Callback) => {
  // Install watchdog timer as the first thing
  // console.log('REQUEST RECEIVED:\n' + JSON.stringify(event))

  // TODO: Handle the error when this fails to get a file
  const api = initializeSpec(JSON.parse((await S3Service.get(SITE_BUCKET, siteSpecPath)).toString()))
  const incomingSpec = initializeSpec(JSON.parse(event.ResourceProperties.DefinitionBody))

  if (event['RequestType'] == 'Delete') {
    // Remove Endpoints
    Object.keys(incomingSpec.paths).forEach(key => delete api.paths[key])
  } else {
    Object.assign(api.paths, incomingSpec.paths || {})
  }

  // Idempotently build the tags and models based on the paths


  // Build the Tag Hash of all of them first with the current spec so it gets overwritten
  const tagsHash = {};
  (api.tags || []).forEach(tag => {
    tagsHash[tag.name] = tag
  });
  // Incoming overwrites if there is a duplicate
  (incomingSpec.tags || []).forEach(tag => {
    tagsHash[tag.name] = tag
  })

  // Build Tags
  // Initialize tags and components so we only get what we are using
  api.tags = []
  const components = {
    schemas: {},
    securitySchemes: {}
  }
  Object.assign(components.schemas, api.components.schemas, incomingSpec.components.schemas)

  // Now iterate the paths and append tags as we encounter them
  Object.keys(api.paths).map((currentPath) => {
    const pathObj = api.paths[currentPath];
    // Append Tags
    (pathObj.tags || []).forEach(tag => api.tags.push(tagsHash[tag]));
  })

  // Build the Models
  Object.assign(api.components || {}, incomingSpec.components)
  // Build the Security Specs
  Object.assign(api.securitySchemes || {}, incomingSpec.secruitySchemes)

  // Upload the output results
  await S3Service.upload(SITE_BUCKET, siteSpecPath, Buffer.from(JSON.stringify(api), 'utf-8'))
  response.send(event, context, response.SUCCESS, null)
}
