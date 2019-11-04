import { APIGatewayEvent, Callback, Context } from "aws-lambda";

exports.handler = (event: APIGatewayEvent, context: Context, callback: Callback) => {
    callback(null, {
        statusCode: 200,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message:"This endpoint does not require any authentication", structure:"This field was added just to prove it's not an error" })
    })
}
