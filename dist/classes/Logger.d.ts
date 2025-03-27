import type { SdkAlert } from '../internalRpcSchema';
export type LogLevel = 'quiet' | 'info' | 'prod' | 'debug';
export declare const CHANGELOG_URL = "https://interval.com/changelog";
export default class Logger {
    logLevel: LogLevel;
    constructor(logLevel?: LogLevel);
    prod(...args: any[]): void;
    prodNoPrefix(...args: any[]): void;
    error(...args: any[]): void;
    info(...args: any[]): void;
    infoNoPrefix(...args: any[]): void;
    warn(...args: any[]): void;
    debug(...args: any[]): void;
    handleSdkAlert(sdkAlert: SdkAlert): void;
}
