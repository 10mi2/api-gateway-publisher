import { S3 } from 'aws-sdk';
const client = new S3()

export class S3Service {
  static list(bucket, path): Promise<string[]> {
    return new Promise<string[]>((resolve, reject) => {
      client.listObjectsV2({
        Bucket: bucket,
        Prefix: path
      }, (err, data) => {
        if (!!err) reject(err)
        if (!!data && data.Contents) {
          resolve(data.Contents.map(c => c.Key))
        }
      })
    })
  }

  static get<T>(bucket, path): Promise<T> {
    return new Promise<T>((resolve, reject) => {
      client.getObject({
        Bucket: bucket,
        Key: path
      }, (err, data) => {
        if (!!err) {
          reject(err)
          return
        }
        resolve(data.Body as T)
      })
    })
  }

  static upload(bucket: string, path: string, body: Buffer): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      client.upload({
        Bucket: bucket,
        Key: path,
        Body: body
      }, (err, data) => {
        if (!!err) {
          reject(err)
          return
        }
        console.log(data.Key)
        resolve(data.Key)
      })
    })
  }

  static delete(bucket, path): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      client.deleteObject({
        Bucket: bucket,
        Key: path
      }, (err, data) => {
        if (!!err) {
          reject(err)
          return
        }
        resolve()
      })
    })
  }
}