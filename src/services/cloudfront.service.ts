import { CloudFront } from 'aws-sdk';
const cloudfront = new CloudFront()


const CLOUDFRONT_ID = process.env.CLOUDFRONT_ID
// Set a datetime so I can run a unique cloudfront invalidation per lambda run.

export class CloudfrontService {
  static createInvalidation(...paths: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cloudfront.createInvalidation({
        DistributionId: CLOUDFRONT_ID,
        InvalidationBatch: {
          CallerReference: `lambda_${(new Date()).getTime()}`,
          Paths: {
            Quantity: paths.length,
            Items: paths
          }
        }
      }, (err, _) => {
        err ? reject(err) : resolve()
      })
    })
  }
}