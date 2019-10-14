import { APIGatewayEvent, Callback, Context } from "aws-lambda";

const DEFAULT_HEADERS = {
  'Access-Control-Allow-Origin': '*'
}

/**
 * Handles all incoming requests associated with the Locations microservice
 * 
 */
exports.handler = async(event: APIGatewayEvent, context: Context, callback: Callback) => {
    const echoValue = event.pathParameters.id || ''
    const isAuth = event.path.indexOf('auth') > -1

    callback(null, {
        statusCode: 200,
        body: JSON.stringify({
            auth: isAuth,
            message: echoValue
        }),
        headers: DEFAULT_HEADERS
    })
}