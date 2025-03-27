"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CHANGELOG_URL = void 0;
const packageManager_1 = require("../utils/packageManager");
const pkg = __importStar(require("../../package.json"));
exports.CHANGELOG_URL = 'https://interval.com/changelog';
class Logger {
    constructor(logLevel) {
        this.logLevel = 'info';
        if (logLevel) {
            this.logLevel = logLevel;
        }
    }
    /* Important messages, always emitted */
    prod(...args) {
        console.log('[Interval] ', ...args);
    }
    /* Same as prod, but without the [Interval] prefix */
    prodNoPrefix(...args) {
        console.log(...args);
    }
    /* Fatal errors or errors in user code, always emitted */
    error(...args) {
        console.error('[Interval] ', ...args);
    }
    /* Informational messages, not emitted in "quiet" logLevel */
    info(...args) {
        if (this.logLevel !== 'quiet') {
            console.info('[Interval] ', ...args);
        }
    }
    /* Same as info, but without the [Interval] prefix */
    infoNoPrefix(...args) {
        if (this.logLevel !== 'quiet') {
            console.log(...args);
        }
    }
    /* Non-fatal warnings, not emitted in "quiet" logLevel */
    warn(...args) {
        if (this.logLevel !== 'quiet') {
            console.warn('[Interval] ', ...args);
        }
    }
    /* Debugging/tracing information, only emitted in "debug" logLevel */
    debug(...args) {
        if (this.logLevel === 'debug') {
            console.debug('[Interval] ', ...args);
        }
    }
    handleSdkAlert(sdkAlert) {
        this.infoNoPrefix();
        const WARN_EMOJI = '\u26A0\uFE0F';
        const ERROR_EMOJI = '‼️';
        const { severity, message } = sdkAlert;
        switch (severity) {
            case 'INFO':
                this.info('🆕\tA new Interval SDK version is available.');
                if (message) {
                    this.info(message);
                }
                break;
            case 'WARNING':
                this.warn(`${WARN_EMOJI}\tThis version of the Interval SDK has been deprecated. Please update as soon as possible, it will not work in a future update.`);
                if (message) {
                    this.warn(message);
                }
                break;
            case 'ERROR':
                this.error(`${ERROR_EMOJI}\tThis version of the Interval SDK is no longer supported. Your app will not work until you update.`);
                if (message) {
                    this.error(message);
                }
                break;
            default:
                if (message) {
                    this.prod(message);
                }
        }
        this.info("\t- See what's new at:", exports.CHANGELOG_URL);
        this.info('\t- Update now by running:', (0, packageManager_1.getInstallCommand)(`${pkg.name}@latest`, (0, packageManager_1.detectPackageManager)()));
        this.infoNoPrefix();
    }
}
exports.default = Logger;
