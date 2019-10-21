import { CloudFormationCustomResourceEventCommon, Callback, Context } from "aws-lambda";
import * as response from 'cfn-response';

import { S3Service } from './s3.service';


const DEST_BUCKET = process.env.SITE_BUCKET

/**
 * Handles Uploading the S3 file, cleaning it and uploading it
 * 
 */
exports.handler = (event: CloudFormationCustomResourceEventCommon, context: Context, callback: Callback) => {
  // Install watchdog timer as the first thing
  console.log('REQUEST RECEIVED:\n' + JSON.stringify(event))

  if (event['RequestType'] == 'Delete') {
    console.log('Delete the bastard')
    response.send(event,context, response.SUCCESS, null)
  }
  else {
    requestParams = event['']
    console.log('update the docs with the location that was passed in')
    response.send(event, context, response.SUCCESS, null)
  }
}
