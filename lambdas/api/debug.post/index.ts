import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { buildResponse } from '../../../utility';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>=>{ try {

  if (context) { context.callbackWaitsForEmptyEventLoop = false; }

  let jsonBody: any;
  try {
    jsonBody = (event.body) ? JSON.parse(event.body) : null;
  } catch (e) { console.log(e); return buildResponse(400, null); }

  const res: any = {
    example: 'Lambda sls typescript webpack example.',
    env: process.env, 
    event: event,
    jsonBody: jsonBody,
  }

  return buildResponse(200, res);

} catch (error) { console.log(error); return buildResponse(500, error); } };