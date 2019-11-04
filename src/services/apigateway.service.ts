import { APIGateway } from 'aws-sdk';

const gatewayClient = new APIGateway()

const exportType = process.env.AWS_API_EXPORT_TYPE
export class APIGatewayService {
    /**
     * Gets the export of the api gateway api docs using the API Gateway ID
     * @param apiId The ID of the API to get the export from
     * @param stage 
     */
    static async getExport(apiId: string, stage: string = 'v1'): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            gatewayClient.getExport({
                restApiId: apiId,
                stageName: stage,
                accepts: 'application/json',
                exportType: exportType
            }, (err, data) => {
                if (!!err) {
                    reject(err)
                    return
                }
                resolve(data.body.toString())
            })
        })

    }

}
