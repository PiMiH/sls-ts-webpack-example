import { APIGatewayProxyResult } from 'aws-lambda';

export const buildResponse = (statusCode: number, data: any): APIGatewayProxyResult =>{

  const headers: { [header: string]: boolean | number | string; } = {
    'Content-Type': 'application/json',
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": true
  }

  const response: any = {
    statusCode: statusCode,
    body: null,
    headers: headers,
  };

  try {
    response.body = JSON.stringify(data);
  } catch (error) {
    response.body = null;
  }

  return response;
}