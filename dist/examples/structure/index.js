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
const helpers_1 = require("../utils/helpers");
const db = __importStar(require("./db"));
const env_1 = __importDefault(require("../../env"));
const routes = {
    // root-level action
    hello_world: async () => {
        return 'Hello, world!';
    },
    // empty router
    emptyRouter: new __1.Page({
        name: 'Empty router',
    }),
    // router with actions but no index page
    actionsOnly: new __1.Page({
        name: 'Actions only',
        routes: {
            action_one: async () => {
                return 'Hello, world!';
            },
            action_two: async () => {
                return 'Hello, world!';
            },
        },
    }),
    // router with index page, no routes
    indexOnly: new __1.Page({
        name: 'Index only',
        async handler() {
            return new __1.Layout({
                title: 'Index only',
                children: [__1.io.display.markdown('Hello, world!')],
            });
        },
    }),
    // router with actions and a nested router with an index page
    users: new __1.Page({
        name: 'Users',
        async handler() {
            const allUsers = db.getUsers();
            return new __1.Layout({
                title: 'Users',
                description: 'This is a multi-level router with multiple nested routers',
                menuItems: [
                    {
                        label: 'Create user',
                        route: 'users/create',
                    },
                ],
                children: [
                    __1.io.display.table('Users', {
                        data: allUsers,
                        rowMenuItems: row => [
                            {
                                label: 'Edit',
                                route: 'users/edit',
                                params: { id: row.id },
                            },
                        ],
                    }),
                ],
            });
        },
        routes: {
            create: {
                name: 'Create user',
                handler: async () => {
                    const [firstName, lastName, email] = await __1.io.group([
                        __1.io.input.text('First name'),
                        __1.io.input.text('Last name'),
                        __1.io.input.email('Email address'),
                    ], {
                        continueButton: {
                            label: 'Create user',
                        },
                    });
                    await (0, helpers_1.sleep)(1000);
                    return { firstName, lastName, email };
                },
            },
            subscriptions: new __1.Page({
                name: 'Subscriptions',
                async handler() {
                    const data = db.getSubscriptions();
                    return new __1.Layout({
                        title: 'Subscriptions',
                        children: [
                            __1.io.display.table('Subscriptions', {
                                data,
                                rowMenuItems: row => [
                                    {
                                        label: 'Edit',
                                        route: 'users/subscriptions/edit',
                                        params: { id: row.id },
                                    },
                                    {
                                        label: 'Cancel',
                                        route: 'users/subscriptions/cancel',
                                        theme: 'danger',
                                        params: { id: row.id },
                                    },
                                ],
                            }),
                        ],
                    });
                },
                routes: {
                    edit: {
                        name: 'Edit subscription',
                        unlisted: true,
                        handler: async () => {
                            return 'Hello, world!';
                        },
                    },
                    cancel: {
                        name: 'Cancel subscription',
                        unlisted: true,
                        handler: async () => {
                            return 'Hello, world!';
                        },
                    },
                },
            }),
            comments: new __1.Page({
                name: 'Comments',
                async handler() {
                    const data = db.getComments();
                    return new __1.Layout({
                        title: 'Comments',
                        menuItems: [
                            {
                                label: 'Create comment',
                                route: 'users/comments/create',
                            },
                        ],
                        children: [
                            __1.io.display.table('Comments', {
                                data,
                                rowMenuItems: row => [
                                    {
                                        label: 'Edit',
                                        route: 'users/comments/edit',
                                        params: { id: row.id },
                                    },
                                ],
                            }),
                        ],
                    });
                },
                routes: {
                    create: {
                        name: 'Create comment',
                        handler: async () => {
                            return '👋';
                        },
                    },
                    edit: {
                        name: 'Edit comment',
                        unlisted: true,
                        handler: async () => {
                            return '👋';
                        },
                    },
                    nested: new __1.Page({
                        name: 'Nested L1',
                        async handler() {
                            return new __1.Layout({});
                        },
                        routes: {
                            create: {
                                name: 'Create L1',
                                handler: async () => {
                                    return '👋';
                                },
                            },
                            nested_2: new __1.Page({
                                name: 'Nested L2',
                                async handler() {
                                    return new __1.Layout({});
                                },
                                routes: {
                                    create: {
                                        name: 'Create L2',
                                        handler: async () => {
                                            return '👋';
                                        },
                                    },
                                },
                            }),
                        },
                    }),
                },
            }),
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
