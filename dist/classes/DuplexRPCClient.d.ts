import { z } from 'zod';
import { Evt } from 'evt';
import type { DuplexMessage } from '../internalRpcSchema';
import ISocket from './ISocket';
export interface MethodDef {
    [key: string]: {
        inputs: z.ZodFirstPartySchemaTypes | z.ZodDiscriminatedUnion<string, any>;
        returns: z.ZodFirstPartySchemaTypes | z.ZodDiscriminatedUnion<string, any>;
    };
}
type OnReplyFn = (anyObject: any) => void;
export type DuplexRPCHandlers<ResponderSchema extends MethodDef> = {
    [Property in keyof ResponderSchema]: (inputs: z.infer<ResponderSchema[Property]['inputs']>) => Promise<z.infer<ResponderSchema[Property]['returns']>>;
};
interface CreateDuplexRPCClientProps<CallerSchema extends MethodDef, ResponderSchema extends MethodDef> {
    communicator: ISocket;
    canCall: CallerSchema;
    canRespondTo: ResponderSchema;
    handlers: DuplexRPCHandlers<ResponderSchema>;
    retryChunkIntervalMs?: number;
}
/**
 * Responsible for making RPC calls to another DuplexRPCClient.
 * Can send messages from CallerSchema and respond to messages
 * from ResponderSchema.
 *
 * @property communicator - The ISocket instance responsible for
 * sending the RPC messages.
 * @property handlers - Defines the actions taken when receiving
 * a given message, an object keyed by the message schema key.
 */
export declare class DuplexRPCClient<CallerSchema extends MethodDef, ResponderSchema extends MethodDef> {
    #private;
    communicator: ISocket;
    canCall: CallerSchema;
    canRespondTo: ResponderSchema;
    handlers: {
        [Property in keyof ResponderSchema]: (inputs: z.infer<ResponderSchema[Property]['inputs']>) => Promise<z.infer<ResponderSchema[Property]['returns']>>;
    };
    pendingCalls: Map<string, OnReplyFn>;
    messageChunks: Map<string, string[]>;
    onMessageReceived: Evt<DuplexMessage>;
    constructor({ communicator, canCall, canRespondTo, handlers, retryChunkIntervalMs, }: CreateDuplexRPCClientProps<CallerSchema, ResponderSchema>);
    private packageResponse;
    private packageCall;
    setCommunicator(newCommunicator: ISocket): void;
    private handleReceivedResponse;
    private handleReceivedCall;
    private onmessage;
    send<MethodName extends keyof CallerSchema>(methodName: MethodName, inputs: z.input<CallerSchema[MethodName]['inputs']>, options?: {
        timeoutFactor?: number;
    }): Promise<z.TypeOf<CallerSchema[MethodName]["returns"]>>;
}
export {};
