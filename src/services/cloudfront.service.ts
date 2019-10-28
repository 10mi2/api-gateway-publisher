import { CloudFront } from 'aws-sdk';
const cloudfront = new CloudFront()

const CLOUDFRONT_ID = process.env.CLOUDFRONT_ID

export class CloudfrontService {
  static createInvalidation(...paths: string[]): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      cloudfront.createInvalidation({
        DistributionId: CLOUDFRONT_ID,
        InvalidationBatch: {
          CallerReference: 'lambda',
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