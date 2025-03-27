/// <reference types="node" />
import { IncomingMessage } from 'http';
export declare function getRequestBody(req: IncomingMessage): Promise<any | null>;
export interface HttpRequestBody {
    requestId?: string;
    httpHostId?: string;
}
export interface LambdaRequestPayload {
    version: '2.0';
    requestContext: {
        http: {
            method: 'GET' | 'POST' | 'PUT' | 'DELETE' | 'OPTIONS';
        };
    };
    body?: string;
}
export interface LambdaResponse {
    isBase64Encoded: boolean;
    statusCode: number;
    headers: Record<string, string>;
    body: string;
}
