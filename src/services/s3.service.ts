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

  static get(bucket, path): Promise<Buffer> {
    return new Promise<Buffer>((resolve, reject) => {
      client.getObject({
        Bucket: bucket,
        Key: path
      }, (err, data: S3.Types.GetObjectOutput) => {
        if (!!err) {
          reject(err)
          return
        }
        resolve(data.Body as Buffer)
      })
    })
  }
  
  static async getJSON<T>(bucket, path): Promise<T> {
    const obj = await S3Service.get(bucket, path)
    return JSON.parse(obj.toString()) as unknown as T
  }

  static upload(bucket: string, path: string, body: string, type: string): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      client.upload({
        Bucket: bucket,
        Key: path,
        Body: Buffer.from(body),
        ContentType: type
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