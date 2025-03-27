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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const __1 = __importStar(require("../.."));
const env_1 = __importDefault(require("../../env"));
const actions = {
    engineers: {
        name: 'Engineers action',
        description: 'This action can only be run by the Engineers team.',
        handler: async () => {
            return 'Hello, world!';
        },
        access: {
            teams: ['engineers'],
        },
    },
    support: {
        name: 'Support action',
        description: 'This action can only be run by the Support team.',
        handler: async () => {
            return 'Hello, world!';
        },
        access: {
            teams: ['support'],
        },
    },
    organization: {
        name: 'Organization action',
        description: 'This action can be run by anyone in the organization.',
        handler: async () => {
            return 'Hello, world!';
        },
        // this is the default setting, just showing it here for clarity
        access: 'entire-organization',
    },
    no_access: {
        name: 'No-access action',
        description: "This action can't be run by anyone in the organization except admins.",
        handler: async () => {
            return 'Hello, world!';
        },
        access: {
            teams: [],
        },
    },
    inherited: {
        name: 'Inherited access action',
        description: 'This action inherits access from its parent group.',
        handler: async () => {
            return 'Hello, world!';
        },
    },
};
const routes = {
    ...actions,
    engineersGroup: new __1.Page({
        name: 'Engineers actions',
        description: 'Can only be seen and accessed by the Engineers group',
        access: {
            teams: ['engineers'],
        },
        routes: {
            action: actions['inherited'],
        },
    }),
    supportGroup: new __1.Page({
        name: 'Support actions',
        description: 'Can only be seen and accessed by the Support group',
        access: {
            teams: ['support'],
        },
        routes: {
            action: actions['inherited'],
        },
    }),
    mixedAccess: new __1.Page({
        name: 'Mixed access',
        description: 'This is a support-only group, but engineers can access an action within it.',
        access: {
            teams: ['support'],
        },
        handler: async () => {
            return new __1.Layout({
                title: 'Mixed access handler',
                children: [__1.io.display.markdown('')],
            });
        },
        routes: {
            engAction: {
                name: 'Engineers can run this',
                description: 'This action can only be run by the Engineers team.',
                access: {
                    teams: ['engineers'],
                },
                handler: async () => {
                    return 'Hello, world!';
                },
            },
            supportAction: {
                name: "Engineers can't run this",
                description: 'Inherits access from the group',
                handler: async () => {
                    return 'Hello, world!';
                },
            },
            orgAction: actions.organization,
        },
    }),
    deeplyNested: new __1.Page({
        name: 'Deeply nested access',
        description: 'Engineers do not have access to this group, but can access an action within the group',
        access: {
            teams: ['support'],
        },
        routes: {
            level2: new __1.Page({
                name: 'Level 2',
                routes: {
                    engAction: actions['engineers'],
                },
            }),
            action: actions['inherited'],
        },
    }),
};
const interval = new __1.default({
    apiKey: env_1.default.DEMO_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:3000/websocket',
    routes,
});
interval.listen();
const prod = new __1.default({
    apiKey: env_1.default.DEMO_PROD_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:3000/websocket',
    routes,
});
prod.listen();
