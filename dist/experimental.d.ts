/// <reference types="node" />
import type { IncomingMessage, ServerResponse } from 'http';
import Interval, { io, ctx, IntervalError } from '.';
import Page from './classes/Page';
import { HttpRequestBody, LambdaRequestPayload, LambdaResponse } from './utils/http';
import Action from './classes/Action';
import { BasicLayout } from './classes/Layout';
declare class ExperimentalInterval extends Interval {
    #private;
    handleRequest({ requestId, httpHostId, }: HttpRequestBody): Promise<boolean>;
    get httpRequestHandler(): (req: IncomingMessage, res: ServerResponse) => Promise<ServerResponse>;
    get lambdaRequestHandler(): (event: LambdaRequestPayload) => Promise<LambdaResponse>;
}
export { Page, Page as ActionGroup, Page as Router, Action, io, ctx, IntervalError, ExperimentalInterval as Interval, BasicLayout as Layout, };
export default ExperimentalInterval;
