import { S3Service } from "./s3.service";
import { initializeSpec } from "./openapi.service";

const SITE_BUCKET = process.env.SITE_BUCKET

export interface OpenApiConfig {
  urls: OpenApiConfigDefinition[]
}

export interface OpenApiConfigDefinition {
  name: string,
  url: string
}

export async function load_openapi_config(): Promise<OpenApiConfig> {
  try {
    const config = await S3Service.getJSON<OpenApiConfig>(SITE_BUCKET, 'config.json')
    console.log(config)
    return config
  } catch(err) {
    console.log('initializeingconfig')
    return { urls: [] }
  }
}

export function update_openapi_config(config: OpenApiConfig): Promise<any> {
  return S3Service.upload(SITE_BUCKET, 'config.json', JSON.stringify(config), 'application/json')
}

// export function load_openapi_spec(name: string): Promise<any> {
//   try {
//     return S3Service.get<string>(SITE_BUCKET, `${name}.json`)
//   } catch(err) {
//     return initializeSpec({}).toString()
//   }
// }
