import { APIGatewayProxyResult, APIGatewayProxyEvent, Context } from 'aws-lambda';
import { buildResponse } from '../../../utility';

export const handler = async (event: APIGatewayProxyEvent, context: Context): Promise<APIGatewayProxyResult>=>{ try {

  if (context) { context.callbackWaitsForEmptyEventLoop = false; }

  const res: any = {
    example: 'Lambda sls typescript webpack example.',
    env: process.env, 
    event: event,
  }

  return buildResponse(200, res);

} catch (error) { console.log(error); return buildResponse(500, error); } };
