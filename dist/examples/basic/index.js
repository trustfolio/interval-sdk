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
const index_1 = __importStar(require("../../index"));
const IntervalClient_1 = __importDefault(require("../../classes/IntervalClient"));
const editEmail_1 = __importDefault(require("./editEmail"));
const helpers_1 = require("../utils/helpers");
const table_actions = __importStar(require("./table"));
const grid_actions = __importStar(require("./grid"));
const unauthorized_1 = __importDefault(require("./unauthorized"));
const upload_1 = require("../utils/upload");
const fs_1 = __importDefault(require("fs"));
const fakeUsers_1 = __importDefault(require("../utils/fakeUsers"));
const dedent_1 = __importDefault(require("dedent"));
const env_1 = __importDefault(require("../../env"));
const gridsPage = new index_1.Page({
    name: 'Grids',
    routes: grid_actions,
    // including this to test two-column page layouts
    handler: async () => {
        const sortAZ = index_1.ctx.params.sortAZ;
        const data = Object.keys(grid_actions).map(k => ({
            name: k,
        }));
        if (index_1.ctx.params.sortAZ) {
            data.sort((a, b) => a.name.localeCompare(b.name));
        }
        return new index_1.Layout({
            title: 'Grids',
            menuItems: [
                sortAZ
                    ? {
                        label: 'Reset sort',
                        route: 'grids',
                    }
                    : {
                        label: 'Sort A-Z',
                        route: 'grids',
                        params: { sortAZ: true },
                    },
            ],
            children: [
                index_1.io.display.table(`Grid layouts (${sortAZ ? 'sorted' : 'not sorted'})`, {
                    data,
                    columns: [
                        {
                            label: 'Name',
                            renderCell: ({ name }) => ({
                                label: name,
                                route: `grids/${name}`,
                            }),
                        },
                    ],
                }),
            ],
        });
    },
});
const page1 = new index_1.Page({
    name: 'Page with children',
    handler: async () => new index_1.Layout({}),
    routes: {
        child_action1: new index_1.Action(async () => 'Hello, world!'),
        child_action2: new index_1.Action(async () => 'Hello, world!'),
        child_page: new index_1.Page({
            name: 'Child page',
        }),
    },
});
const page2 = new index_1.Page({
    name: 'Page with page with children',
    routes: {
        page1,
    },
});
const sidebar_depth = new index_1.Page({
    name: 'Sidebar depth page testing',
    routes: {
        page1,
        page2,
    },
});
const empty_page = new index_1.Page({
    name: 'Empty page',
    handler: async () => {
        if (index_1.ctx.params.show_layout) {
            return new index_1.Layout({
                title: 'Contents!',
                children: [index_1.io.display.markdown('Children!')],
                menuItems: [
                    {
                        label: 'Hide layout',
                        route: 'empty_page',
                    },
                ],
            });
        }
    },
    routes: {
        child_action: new index_1.Action(async () => {
            await index_1.io.group([
                index_1.io.display.link('Go to unlisted action', {
                    route: 'empty_page/unlisted_action',
                    theme: 'secondary',
                }),
                index_1.io.display.link('Go to unlisted page', {
                    route: 'empty_page/unlisted_page',
                    theme: 'secondary',
                }),
            ]);
        }),
        unlisted_action: new index_1.Action({
            unlisted: true,
            handler: async () => {
                return 'Hello!';
            },
        }),
        unlisted_page: new index_1.Page({
            name: 'Unlisted page',
            unlisted: true,
            handler: async () => {
                return new index_1.Layout({
                    children: [
                        index_1.io.display.markdown('This page is unlisted, but you can still access it!'),
                    ],
                });
            },
        }),
        show_layout: new index_1.Action(async () => {
            index_1.ctx.redirect({ route: 'empty_page', params: { show_layout: 1 } });
        }),
    },
});
const confirmIdentity = new index_1.Action({
    name: 'Confirm identity',
    handler: async () => {
        await index_1.io.input.text('Enter your name');
        const canDoSensitiveTask = await index_1.io.confirmIdentity('This action is pretty sensitive', {
            gracePeriodMs: 0,
        });
        let canDoSensitiveTaskAgain = false;
        if (canDoSensitiveTask) {
            index_1.ctx.log('OK! Identity confirmed.');
            await index_1.io.input.text('Enter another name');
            canDoSensitiveTaskAgain = await index_1.io.confirmIdentity('This action is still pretty sensitive');
        }
        else {
            index_1.ctx.log('Identity not confirmed, cancelling…');
        }
        return {
            identityConfirmed: canDoSensitiveTask && canDoSensitiveTaskAgain,
        };
    },
});
const actionLinks = async () => {
    await index_1.io.group([
        index_1.io.display.table('In a table!', {
            data: [
                { slug: undefined },
                { slug: 'noInteractiveElements' },
                {
                    slug: 'helloCurrentUser',
                    params: { message: 'Hi from a table!' },
                },
            ],
            columns: [
                {
                    label: 'Action slug',
                    renderCell: row => row.slug,
                },
                {
                    label: 'Link',
                    renderCell: row => {
                        var _a;
                        return ({
                            label: (_a = row.slug) !== null && _a !== void 0 ? _a : '(undefined)',
                            action: row.slug,
                            params: row.params,
                        });
                    },
                },
            ],
        }),
        index_1.io.display.link('External link', {
            url: 'https://example.com',
        }),
        index_1.io.display.link('Action link', {
            route: 'helloCurrentUser',
            params: {
                message: 'From a button!',
            },
        }),
        index_1.io.display.link('This same action', {
            route: 'actionLinks',
            params: {
                prevActionAt: new Date().toISOString(),
            },
        }),
    ]);
};
const echoContext = new index_1.Action(async () => {
    const data = {
        organization: index_1.ctx.organization,
        action: index_1.ctx.action,
        environment: index_1.ctx.environment,
        params: index_1.ctx.params,
        user: index_1.ctx.user,
    };
    console.log(data);
    await index_1.io.display.object('Context', {
        data,
    });
});
const redirect_page_test = new index_1.Page({
    name: 'Redirector',
    handler: async () => {
        await index_1.ctx.redirect({
            route: 'echoContext',
            params: { from: 'redirect_page_test' },
            replace: true,
        });
        // Not necessary after #1206 is merged
        return new index_1.Layout({});
    },
});
const prod = new index_1.default({
    apiKey: env_1.default.DEMO_PROD_API_KEY,
    endpoint: 'ws://localhost:8000/websocket',
    logLevel: 'debug',
    routes: {
        sidebar_depth,
        redirect_page_test,
        backgroundable: {
            backgroundable: true,
            handler: async () => {
                const first = await index_1.io.input.text('First input');
                await index_1.ctx.loading.start({
                    label: 'Thinking...',
                    description: 'This will take 5 seconds, feel free to navigate away.',
                });
                await (0, helpers_1.sleep)(5000);
                const second = await index_1.io.input.text('Second input');
                return { first, second };
            },
        },
        ping: new index_1.Action({
            name: 'Ping',
            handler: async () => {
                await prod.ping();
                return 'Pong!';
            },
        }),
        actionLinks,
        echoContext,
        confirm_identity: confirmIdentity,
        continueCmdEnter: {
            name: 'CMD + Enter submit demo',
            handler: async () => {
                const [theme, label, requireCompletion] = await index_1.io.group([
                    index_1.io.select.single('Theme', {
                        options: ['primary', 'danger', 'secondary'],
                        defaultValue: 'primary',
                    }),
                    index_1.io.input.text('Label', {
                        defaultValue: 'Continue',
                    }),
                    index_1.io.input.boolean('Require completion?', {
                        defaultValue: false,
                    }),
                ]);
                const [value] = await index_1.io.group([
                    index_1.io.input.text('Enter some multiline text', {
                        multiline: true,
                        defaultValue: 'Say something...',
                    }),
                    index_1.io.input.number('Enter a number').optional(!requireCompletion),
                ], {
                    continueButton: {
                        theme: theme,
                        label,
                    },
                });
                return `You said: ${value}`;
            },
        },
        helloCurrentUser: {
            name: 'Hello, current user!',
            description: '👋',
            backgroundable: true,
            handler: async () => {
                console.log(index_1.ctx.params);
                let heading = `Hello, ${index_1.ctx.user.firstName} ${index_1.ctx.user.lastName}`;
                if (index_1.ctx.params.message) {
                    heading += ` (Message: ${index_1.ctx.params.message})`;
                }
                return heading;
            },
        },
        redirectWithoutWarningTest: {
            warnOnClose: false,
            handler: async () => {
                const text = await index_1.io.input.text('Edit text before navigating', {
                    defaultValue: 'Backspace me',
                });
                const text2 = await index_1.io.input.text('Edit text before navigating', {
                    defaultValue: 'Backspace me',
                });
                index_1.ctx.redirect({ action: 'actionLinks' });
            },
        },
        ImportUsers: {
            backgroundable: true,
            name: 'Import users',
            description: "Doesn't actually import users",
            access: {
                teams: ['support'],
            },
            handler: async (io) => {
                console.log("I'm a live mode action");
                const name = await io.input.text('Enter the name for a user');
                return { name };
            },
        },
        enter_two_numbers: new index_1.Action({
            handler: async (io) => {
                const num1 = await io.input.number('Enter a number');
                try {
                    const num2 = await io.input.number(`Enter a second number that's greater than ${num1}`, {
                        min: num1 + 0.01,
                        decimals: 2,
                    });
                    return { num1, num2 };
                }
                catch (err) {
                    if (err instanceof index_1.IOError) {
                        // Do some long cleanup work
                        await (0, helpers_1.sleep)(num1 * 1000);
                        return {
                            'Cleanup time': `${num1} seconds`,
                            'Cleanup completed': new Date(),
                        };
                    }
                    // Other error in host code
                    throw new Error('Something bad happened!');
                }
            },
        }),
        enter_two_numbers_no_prompt: new index_1.Action({
            warnOnClose: false,
            handler: async (io) => {
                const num1 = await io.input.number('Enter a number');
                const num2 = await io.input.number(`Enter a second number that's greater than ${num1}`, {
                    min: num1 + 0.01,
                    decimals: 2,
                });
                return { num1, num2 };
            },
        }),
        enter_one_number: async (io, ctx) => {
            ctx.log('Requesting a number');
            const num = await io.input.number('Enter a number');
            ctx.log('Received', num);
            ctx.log('Received 1', num);
            ctx.log('Received 2', num);
            ctx.log('Received 3', num);
            return { num };
        },
        perform_redirect_flow: async () => {
            let startedWork = false;
            const { workDone = false } = index_1.ctx.params;
            if (!workDone) {
                await index_1.ctx.redirect({
                    route: 'perform_common_work',
                });
                startedWork = true;
            }
            console.log({ startedWork, workDone });
            return {
                startedWork,
                workDone,
            };
        },
        perform_common_work: async () => {
            index_1.ctx.loading.start('Performing some work, will redirect back when complete');
            await (0, helpers_1.sleep)(2000);
            await index_1.ctx.redirect({
                route: 'perform_redirect_flow',
                params: {
                    workDone: true,
                },
            });
        },
        empty_page,
        grids: gridsPage,
        tables: new index_1.Page({
            name: 'Tables',
            routes: table_actions,
        }),
        to_page: new index_1.Page({
            name: 'A Go to page test',
            handler: async () => {
                return new index_1.Layout({
                    children: [
                        index_1.io.display.table('Table', {
                            data: [{ a: 1 }],
                            rowMenuItems: row => [
                                {
                                    label: 'To async page',
                                    route: 'async_page_test',
                                },
                            ],
                        }),
                    ],
                });
            },
        }),
        async_page_test: new index_1.Page({
            name: 'Async page test',
            handler: async () => {
                await (0, helpers_1.sleep)(30000);
                // await ctx.loading.start('Generating page...')
                //
                // await sleep(2_000)
                //
                // await ctx.loading.start({
                //   label: 'Generating rows...',
                //   itemsInQueue: 100,
                // })
                //
                // for (let i = 0; i < 100; i++) {
                //   await ctx.loading.completeOne()
                //   await sleep(100)
                // }
                const allData = (0, helpers_1.generateRows)(100);
                return new index_1.Layout({
                    children: [
                        index_1.io.display.table('Display users', {
                            async getData({ queryTerm, sortColumn, sortDirection, offset, pageSize, }) {
                                let filteredData = allData.slice();
                                if (queryTerm) {
                                    const re = new RegExp(queryTerm, 'i');
                                    filteredData = filteredData.filter(row => {
                                        return (re.test(row.name) ||
                                            re.test(row.email) ||
                                            re.test(row.description));
                                    });
                                }
                                if (sortColumn && sortDirection) {
                                    filteredData.sort((a, b) => {
                                        if (sortDirection === 'desc') {
                                            const temp = b;
                                            b = a;
                                            a = temp;
                                        }
                                        if (!(sortColumn in a) || !(sortColumn in b))
                                            return 0;
                                        const aVal = a[sortColumn];
                                        const bVal = b[sortColumn];
                                        if (aVal < bVal)
                                            return -1;
                                        if (aVal > bVal)
                                            return 1;
                                        return 0;
                                    });
                                }
                                return {
                                    data: filteredData.slice(offset, offset + pageSize),
                                    totalRecords: filteredData.length,
                                };
                            },
                            defaultPageSize: 50,
                            columns: ['id', 'email', 'description'],
                            rowMenuItems: row => [
                                {
                                    label: 'Edit',
                                    route: 'edit_user',
                                    params: { email: row.email },
                                },
                            ],
                        }),
                    ],
                });
            },
        }),
    },
});
prod.listen();
const interval = new index_1.default({
    apiKey: env_1.default.DEMO_API_KEY,
    logLevel: 'debug',
    endpoint: 'ws://localhost:8000/websocket',
    onError: props => {
        console.debug('onError', props);
    },
    routes: {
        sidebar_depth,
        echoContext,
        redirect_page_test,
        empty_page,
        ping: new index_1.Action({
            name: 'Ping',
            handler: async () => {
                await prod.ping();
                return 'Pong!';
            },
        }),
        html: async () => {
            await index_1.io.display.markdown('Done!');
            await index_1.io.display.html('HTML', {
                html: '<p>Hello, world!</p>',
            });
            const richText = await index_1.io.input.richText('Text', {});
            await index_1.io.display.html('What you entered', {
                html: richText,
            });
            await index_1.io.display.html('Restricted', {
                html: `
        <h2>Heading 2</h2>
          <script>alert('hello, world!');</script>
          <noscript>No script.</noscript>
          <style>html { color: red; }</style>

          <form method="POST">
            <button onclick="window.alert">Button</button>
          </form>

          <iframe src="https://interval.com"></iframe>

          <p class="text-xl" style="color: red;">Hello, in red!</p>
          <p class="text-lg">
          </html>drop table users;
        `,
            });
        },
        inputRightAfterDisplay: async () => {
            await index_1.io.display.link('Display', {
                url: '',
            });
            await index_1.io.input.text('Text');
        },
        loadingAfterDisplay: new index_1.Action({
            name: 'Broken loading',
            handler: async () => {
                await index_1.io.display.heading('Hello from display');
                await index_1.ctx.loading.start({
                    label: 'Waiting for external system',
                });
                await (0, helpers_1.sleep)(2000);
                await index_1.io.display.markdown('Done!');
            },
        }),
        searches: new index_1.Page({
            name: 'Search',
            routes: {
                two_searches: async (io) => {
                    const [r1, r2] = await io.group([
                        io.search('One', {
                            onSearch: async (query) => helpers_1.fakeDb.find(query),
                            renderResult: result => ({
                                label: `${result.first_name} ${result.last_name}`,
                            }),
                        }),
                        io.search('Two', {
                            onSearch: async (query) => helpers_1.fakeDb.find(query),
                            renderResult: result => ({
                                label: `${result.first_name} ${result.last_name}`,
                            }),
                        }),
                    ]);
                    console.log({ r1, r2 });
                },
                multiple_search: async (io) => {
                    const bareResults = await io
                        .search('Bare', {
                        onSearch: async (query) => helpers_1.fakeDb.find(query),
                        renderResult: result => ({
                            label: `${result.first_name} ${result.last_name}`,
                        }),
                    })
                        .multiple();
                    const [groupResults] = await io.group([
                        io
                            .search('In a group', {
                            onSearch: async (query) => helpers_1.fakeDb.find(query),
                            renderResult: result => ({
                                label: `${result.first_name} ${result.last_name}`,
                            }),
                        })
                            .multiple(),
                    ]);
                    console.log({ bareResults, groupResults });
                    return {
                        'Bare selected': bareResults
                            .map(r => `${r.first_name} ${r.last_name}`)
                            .join(', '),
                        'Group selected': groupResults
                            .map(r => `${r.first_name} ${r.last_name}`)
                            .join(', '),
                    };
                },
                optional_multiple: async (io) => {
                    var _a, _b, _c, _d;
                    const bareResults = await io
                        .search('Bare', {
                        onSearch: async (query) => helpers_1.fakeDb.find(query),
                        renderResult: result => ({
                            label: `${result.first_name} ${result.last_name}`,
                        }),
                    })
                        .multiple()
                        .optional();
                    const [groupResults] = await io.group([
                        io
                            .search('In a group', {
                            onSearch: async (query) => helpers_1.fakeDb.find(query),
                            renderResult: result => ({
                                label: `${result.first_name} ${result.last_name}`,
                            }),
                        })
                            .multiple()
                            .optional(),
                    ]);
                    console.log({ bareResults, groupResults });
                    return {
                        'Bare selected': (_b = (_a = bareResults === null || bareResults === void 0 ? void 0 : bareResults.map(r => `${r.first_name} ${r.last_name}`)) === null || _a === void 0 ? void 0 : _a.join(', ')) !== null && _b !== void 0 ? _b : 'None!',
                        'Group selected': (_d = (_c = groupResults === null || groupResults === void 0 ? void 0 : groupResults.map(r => `${r.first_name} ${r.last_name}`)) === null || _c === void 0 ? void 0 : _c.join(', ')) !== null && _d !== void 0 ? _d : 'None!',
                    };
                },
                multiple_validation: async (io) => {
                    var _a, _b;
                    const bareResults = await io
                        .search('Bare', {
                        onSearch: async (query) => helpers_1.fakeDb.find(query),
                        renderResult: result => ({
                            label: `${result.first_name} ${result.last_name}`,
                        }),
                    })
                        .validate(() => {
                        throw new Error('This should never be called!');
                    })
                        .multiple()
                        .validate(results => {
                        console.log('Bare', results);
                        return undefined;
                    });
                    const [groupResults] = await io
                        .group([
                        io
                            .search('In a group', {
                            onSearch: async (query) => helpers_1.fakeDb.find(query),
                            renderResult: result => ({
                                label: `${result.first_name} ${result.last_name}`,
                            }),
                        })
                            .validate(() => {
                            throw new Error('This should never be called!');
                        })
                            .multiple()
                            .optional()
                            .validate(results => {
                            console.log('Group inner', results);
                            return undefined;
                        }),
                    ])
                        .validate(([results]) => {
                        console.log('Group outer', results);
                        return undefined;
                    });
                    console.log({ bareResults, groupResults });
                    return {
                        'Bare selected': bareResults
                            .map(r => `${r.first_name} ${r.last_name}`)
                            .join(', '),
                        'Group selected': (_b = (_a = groupResults === null || groupResults === void 0 ? void 0 : groupResults.map(r => `${r.first_name} ${r.last_name}`)) === null || _a === void 0 ? void 0 : _a.join(', ')) !== null && _b !== void 0 ? _b : 'None!',
                    };
                },
                default_value: async (io) => {
                    const bareResult = await io.search('Bare', {
                        onSearch: async (query) => helpers_1.fakeDb.find(query),
                        renderResult: result => ({
                            label: `${result.first_name} ${result.last_name}`,
                        }),
                        defaultValue: fakeUsers_1.default[0],
                    });
                    const [groupResults] = await io.group([
                        io
                            .search('In a group', {
                            onSearch: async (query) => helpers_1.fakeDb.find(query),
                            renderResult: result => ({
                                label: `${result.first_name} ${result.last_name}`,
                            }),
                        })
                            .multiple({
                            defaultValue: await helpers_1.fakeDb.find('jo'),
                        }),
                    ]);
                    console.log({ bareResult, groupResults });
                    return {
                        'Bare selected': `${bareResult.first_name} ${bareResult.last_name}`,
                        'Group selected': groupResults
                            .map(r => `${r.first_name} ${r.last_name}`)
                            .join(', '),
                    };
                },
            },
        }),
        section_heading: async (io) => {
            await io.group([
                io.display.heading('Section heading', {
                    level: 2,
                    description: 'A section heading here',
                    menuItems: [
                        { label: 'Link', url: 'https://interval.com', theme: 'primary' },
                        { label: 'Danger', action: 'disabled_inputs', theme: 'danger' },
                    ],
                }),
                io.input.text('Text input'),
                io.input.text('Multiline', {
                    multiline: true,
                }),
                io.display.heading('Sub-heading', {
                    level: 3,
                    description: 'A subsection',
                }),
            ]);
        },
        spreadsheet: async (io) => {
            const sheet = await io.experimental.spreadsheet('Enter records', {
                columns: {
                    string: 'string',
                    optionalString: 'string?',
                    number: 'number',
                    boolean: 'boolean',
                },
            });
            return sheet[0];
        },
        optional: async (io) => {
            await io.input.text('Text').optional();
            await io.input.email('Email').optional();
            await io.input.number('Number').optional();
            await io.input.richText('Rich text').optional();
            await io.input.date('Date').optional();
            await io.input.time('Time').optional();
            await io.input.datetime('Datetime').optional();
            await io.select
                .single('Select single', {
                options: [],
            })
                .optional();
            await io.select
                .single('Select multiple', {
                options: [],
            })
                .optional();
            await io
                .search('Search', {
                async onSearch() {
                    return [];
                },
                renderResult: () => '',
            })
                .optional();
            const date = await io.input.date('Date').optional();
            const datetime = await io.input.datetime('Datetime').optional();
            const table = await io.select
                .table('Table', {
                data: [
                    { a: 1, b: 2, c: 3 },
                    { a: 4, b: 5, c: 6 },
                    { a: 7, b: 8, c: 9 },
                ],
                minSelections: 1,
                maxSelections: 1,
            })
                .optional();
            await io.display.object('Date', {
                data: date,
            });
            await io.display.object('Datetime', {
                data: datetime,
            });
            return table === null || table === void 0 ? void 0 : table[0];
        },
        disabled_inputs: async (io) => {
            await io.group([
                io.display.heading('Here are a bunch of disabled inputs'),
                io.input.text('Text input', {
                    disabled: true,
                    placeholder: 'Text goes here',
                }),
                io.input.datetime('Date & time', { disabled: true }),
                io.input.boolean('Boolean input', { disabled: true }),
                io.select.single('Select something', {
                    options: [1, 2, 3],
                    disabled: true,
                }),
                io.input.number('Number input', {
                    disabled: true,
                }),
                io.input.email('Email input', { disabled: true }),
                io.input.richText('Rich text input', { disabled: true }),
                io.search('Search for a user', {
                    disabled: true,
                    renderResult: user => ({
                        label: user.name,
                        description: user.email,
                    }),
                    onSearch: async (query) => {
                        return [
                            {
                                name: 'John Doe',
                                email: 'johndoe@example.com',
                            },
                        ];
                    },
                }),
                io.select.multiple('Select multiple of something', {
                    options: [1, 2, 3],
                    disabled: true,
                }),
                io.select.table('Select from table', {
                    data: [
                        {
                            album: 'Exile on Main Street',
                            artist: 'The Rolling Stones',
                            year: 1972,
                        },
                        {
                            artist: 'Michael Jackson',
                            album: 'Thriller',
                            year: 1982,
                        },
                        {
                            album: 'Enter the Wu-Tang (36 Chambers)',
                            artist: 'Wu-Tang Clan',
                            year: 1993,
                        },
                    ],
                    disabled: true,
                }),
                io.input.date('Date input', { disabled: true }),
                io.input.time('Time input', { disabled: true }),
                io.input.file('File input', { disabled: true }),
            ]);
            return 'Done!';
        },
        readonly_inputs: async (io) => {
            let i = 0;
            while (i < 2) {
                const responses = await io.group([
                    io.input
                        .text('Empty text input', {
                        placeholder: 'Text goes here',
                    })
                        .optional(),
                    io.input.text('Text input', {
                        placeholder: 'Text goes here',
                        defaultValue: 'Default value',
                    }),
                    io.input.datetime('Date & time').optional(),
                    io.input.datetime('Date & time', {
                        defaultValue: new Date(),
                    }),
                    io.input.boolean('Boolean input').optional(),
                    io.input.boolean('Boolean input', { defaultValue: null }),
                    io.select
                        .single('Select something', {
                        options: [1, 2, 3],
                    })
                        .optional(),
                    io.select.single('Select something', {
                        options: [1, 2, 3],
                        defaultValue: 1,
                    }),
                    io.input.number('Number input', { defaultValue: null }).optional(),
                    io.input.number('Number input', { defaultValue: 100 }),
                    io.input.email('Email input').optional(),
                    io.input.email('Email input', { defaultValue: 'hi@interval.com' }),
                    io.input
                        .richText('Rich text input', { defaultValue: null })
                        .optional(),
                    io.input.richText('Rich text input', {
                        defaultValue: 'Hello world',
                    }),
                    io
                        .search('Search for a user', {
                        renderResult: user => ({
                            label: user.name,
                            description: user.email,
                        }),
                        onSearch: async (query) => {
                            return [
                                {
                                    name: 'John Doe',
                                    email: 'johndoe@example.com',
                                },
                            ];
                        },
                    })
                        .optional(),
                    io.select
                        .multiple('Select multiple of something', {
                        options: [1, 2, 3],
                    })
                        .optional(),
                    io.select
                        .table('Select from table', {
                        data: [
                            {
                                album: 'Exile on Main Street',
                                artist: 'The Rolling Stones',
                                year: 1972,
                            },
                            {
                                artist: 'Michael Jackson',
                                album: 'Thriller',
                                year: 1982,
                            },
                            {
                                album: 'Enter the Wu-Tang (36 Chambers)',
                                artist: 'Wu-Tang Clan',
                                year: 1993,
                            },
                        ],
                    })
                        .optional(),
                    io.input.date('Date input').optional(),
                    io.input.time('Time input').optional(),
                    io.input.file('File input').optional(),
                ]);
                console.debug(responses);
                i++;
            }
            return 'Done!';
        },
        'long-return-string': async (io) => {
            return {
                date: new Date(),
                url: 'http://chart.apis.google.com/chart?chs=500x500&chma=0,0,100,100&cht=p&chco=FF0000%2CFFFF00%7CFF8000%2C00FF00%7C00FF00%2C0000FF&chd=t%3A122%2C42%2C17%2C10%2C8%2C7%2C7%2C7%2C7%2C6%2C6%2C6%2C6%2C5%2C5&chl=122%7C42%7C17%7C10%7C8%7C7%7C7%7C7%7C7%7C6%7C6%7C6%7C6%7C5%7C5&chdl=android%7Cjava%7Cstack-trace%7Cbroadcastreceiver%7Candroid-ndk%7Cuser-agent%7Candroid-webview%7Cwebview%7Cbackground%7Cmultithreading%7Candroid-source%7Csms%7Cadb%7Csollections%7Cactivity|Chart',
                something: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam in lorem sagittis accumsan malesuada nec mauris. Nulla cursus dolor id augue sodales, et consequat elit mattis. Suspendisse nec sollicitudin ex. Pellentesque laoreet nulla nec malesuada consequat. Donec blandit leo id tincidunt tristique. Mauris vehicula metus sed ex bibendum, nec bibendum urna tincidunt. Curabitur porttitor euismod velit sed interdum. Suspendisse at dapibus eros. Vestibulum varius, est vel luctus pellentesque, risus lorem ullamcorper est, a ullamcorper metus dolor eget neque. Donec sit amet nulla tempus, fringilla magna eu, bibendum tortor. Nam pulvinar diam id vehicula posuere. Praesent non turpis et nibh dictum suscipit non nec ante. Phasellus vulputate egestas nisl a dapibus. Duis augue lorem, mattis auctor condimentum a, convallis sed elit. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Pellentesque bibendum, magna vel pharetra fermentum, eros mi vulputate enim, in consectetur est quam quis felis.',
            };
        },
        // 'progress-through-long-list': async io => {
        //   const resp = await io.experimental.progressThroughList(
        //     'Here are some items',
        //     ['Dan', 'Alex', 'Jacob'],
        //     async person => {
        //       await sleep(1000)
        //       return `Hi, ${person}!`
        //     }
        //   )
        //
        //   console.log('done!', resp)
        // },
        noInteractiveElements: async (io) => {
            await io.display.heading('I block :(');
            console.log('done!');
        },
        dynamic_group: async (io) => {
            const promises = [
                io.input.text('Your name'),
                io.input.number('Pick a number').optional(),
            ];
            const resp = await io.group(promises);
            console.log(resp);
            const obj = {
                text: io.input.text('Text'),
                num: io.input.number('Number'),
            };
            const objResp = await io.group(obj);
        },
        object_group: async (io) => {
            const resp = await io.group({
                name: io.input.text('Name'),
                email: io.input.email('Email'),
                num: io.input.number('Number').optional(),
                _disp: io.display.markdown('---'),
            });
            const { name, email, num } = resp;
            return {
                name,
                email,
                num,
            };
        },
        optional_values: async (io) => {
            var _a;
            const [name, num, color] = await io.group([
                io.input.text('Your name'),
                io.input.number('Pick a number').optional(),
                io.select
                    .single('Your favorite color', {
                    options: [
                        {
                            label: 'Red',
                            value: 'red',
                        },
                        {
                            label: 'Blue',
                            value: 'blue',
                        },
                        {
                            label: 'Orange',
                            value: 'orange',
                        },
                    ],
                })
                    .optional(),
            ]);
            const table = await io.select
                .table('Table', {
                data: [
                    { a: 1, b: 2, c: 3 },
                    { a: 4, b: 5, c: 6 },
                    { a: 7, b: 8, c: 9 },
                ],
                minSelections: 1,
                maxSelections: 1,
            })
                .optional();
            return {
                Name: name,
                Number: num !== null && num !== void 0 ? num : 'No number selected',
                'Favorite color': (_a = color === null || color === void 0 ? void 0 : color.label) !== null && _a !== void 0 ? _a : 'Unknown',
                Selected: JSON.stringify(table),
            };
        },
        'unauthorized-error': unauthorized_1.default,
        bare_string_return: async () => {
            return 'Hello, Interval!';
        },
        bare_list_return: async (io) => {
            return await io.group([
                io.input.text('Text'),
                io.input.number('Number'),
                io.input.boolean('Boolean'),
            ]);
        },
        petr_repro: async () => {
            // Data will be undefined if you just click "continue" without modifying the form.
            const data = await index_1.io.select.single('Some field', {
                options: [],
                defaultValue: { label: 'my label', value: 'my_value' },
            });
            // This should be an object equal to the defaultValue
            console.log('data', data);
            await index_1.io.display.object('Return', {
                data: { mySuperValue: data || 'No data' },
            });
        },
        metadata: async (io, ctx) => {
            const data = [
                {
                    label: 'Is true',
                    value: true,
                },
                {
                    label: 'Is false',
                    value: false,
                },
                {
                    label: 'Is null',
                    value: null,
                },
                {
                    label: 'Is undefined',
                    value: undefined,
                },
                {
                    label: 'Is empty string',
                    value: '',
                },
                {
                    label: 'Is a promise',
                    value: new Promise(async (resolve) => {
                        await (0, helpers_1.sleep)(2000);
                        resolve('Done!');
                    }),
                },
                {
                    label: 'Throws an error',
                    value: new Promise(() => {
                        throw new Error('Oops!');
                    }),
                },
                {
                    label: 'Is a function',
                    value: () => 'Called it',
                },
                {
                    label: 'Is an async function',
                    value: async () => {
                        await (0, helpers_1.sleep)(3500);
                        return 'Did it';
                    },
                },
                {
                    label: 'Is long string',
                    value: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed sit amet quam in lorem',
                },
                {
                    label: 'Is number 15',
                    value: 15,
                },
                {
                    label: 'Is string',
                    value: 'Hello',
                },
                {
                    label: 'Action link',
                    value: 'Click me',
                    action: 'helloCurrentUser',
                    params: { message: 'Hello from metadata!' },
                },
                {
                    label: 'External link',
                    value: 'Click me',
                    url: 'https://interval.com',
                },
                {
                    label: 'Image',
                    value: 'Optional caption',
                    image: new Promise(resolve => {
                        (0, helpers_1.sleep)(1500).then(() => {
                            resolve({
                                url: 'https://picsum.photos/200/300',
                                size: 'small',
                            });
                        });
                    }),
                },
            ];
            await io.group([
                io.display.heading(`Grid view`),
                io.display.metadata('Metadata grid label', { data }),
                io.display.heading(`List view`),
                io.display.metadata('', {
                    layout: 'list',
                    data,
                }),
                io.display.heading(`Card view`),
                io.display.metadata('', {
                    layout: 'card',
                    data,
                }),
            ]);
        },
        code: async () => {
            await index_1.io.group([
                index_1.io.input.text('Text input'),
                index_1.io.display.code('Code from string', {
                    code: 'console.log("Hello, world!")',
                    language: 'typescript',
                }),
                index_1.io.display.code('Code from file', {
                    code: fs_1.default.readFileSync('./src/examples/basic/unauthorized.ts', {
                        encoding: 'utf8',
                    }),
                }),
                index_1.io.display.markdown(`**Code in Markdown**
          
          ~~~ts
          const foo: string = 'bar'
          if (foo === 'bar') {
            console.log('foo is bar')
          } else {
            console.log('foo is not bar')
          }
          ~~~`),
                index_1.io.display.table('In a table', {
                    data: [
                        {
                            label: 'Code block',
                            value: (0, dedent_1.default) `~~~ts
                const foo: string = 'bar'
                if (foo === 'bar') {
                  console.log('foo is bar')
                } else {
                  console.log('foo is not bar')
                }
                ~~~`,
                        },
                    ],
                }),
            ]);
        },
        images: async () => {
            await index_1.io.group([
                index_1.io.display.image('Image via url', {
                    url: 'https://media.giphy.com/media/26ybw6AltpBRmyS76/giphy.gif',
                    alt: "Man makes like he's going to jump on a skateboard but doesn't",
                    width: 'medium',
                }),
                index_1.io.display.image('Image via buffer', {
                    buffer: fs_1.default.readFileSync('./src/examples/static/fail.gif'),
                    alt: 'Wile E. Coyote pulls a rope to launch a boulder from a catapult but it topples backwards and crushes him',
                }),
            ]);
        },
        videos: async () => {
            const [url] = await index_1.io.group([
                index_1.io.input.url('URL for video').optional(),
                index_1.io.display.video('Video via url', {
                    url: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/The_Kid_scenes.ogv',
                    size: 'large',
                    muted: true,
                }),
                index_1.io.display.video('Video via buffer', {
                    loop: true,
                    buffer: fs_1.default.readFileSync('./src/examples/static/canyon.mp4'),
                    size: 'large',
                }),
            ]);
            if (url) {
                await index_1.io.display.video('Portrait video', {
                    url: url.toString(),
                    size: 'medium',
                });
            }
        },
        enter_two_integers: async (io) => {
            const num1 = await io.input.number('Enter a number');
            const num2 = await io.input.number(`Enter a second number that's greater than ${num1}`, {
                min: num1 + 1,
            });
            return { num1, num2, sum: num1 + num2 };
        },
        enter_two_numbers: async (io) => {
            const num1 = await io.input.number('Enter a number');
            const num2 = await io.input.number(`Enter a second number that's greater than ${num1}`, {
                min: num1 + 0.01,
                decimals: 2,
            });
            return { num1, num2, sum: num1 + num2 };
        },
        logs: async (_, ctx) => {
            for (let i = 0; i < 10; i++) {
                await ctx.log('Log number', i);
                await (0, helpers_1.sleep)(500);
            }
        },
        logTest: async (io, ctx) => {
            ctx.log(new Date().toUTCString());
            const name = await io.input.text('Your name');
            ctx.log(new Date().toUTCString());
            const email = await io.input.email('Your email');
            ctx.log('Received', { name, email });
            ctx.log('Data types: ', true, null, undefined, [1, 2, 3], {
                a: 1,
                b: '2',
            });
            const itemsInQueue = 100;
            await ctx.loading.start({
                itemsInQueue,
            });
            for (let i = 0; i < itemsInQueue; i++) {
                await (0, helpers_1.sleep)(100);
                ctx.log(i);
                await ctx.loading.completeOne();
                await ctx.notify({
                    title: `Item ${i}`,
                    message: `Hello, ${name}!`,
                    delivery: [{ to: email }],
                });
            }
            return { name, email };
        },
        confirmBeforeDelete: async (io, ctx) => {
            const email = await io.input.email('Enter an email address', {
                defaultValue: 'hello@interval.com',
            });
            const shouldDelete = await io.confirm(`Delete this user?`, {
                helpText: 'All of their data will be removed.',
            });
            if (!shouldDelete) {
                ctx.log('Canceled by user');
                return;
            }
            await ctx.loading.start({
                label: 'Fetching users...',
                description: 'This may take a while...',
            });
            await (0, helpers_1.sleep)(1500);
            await ctx.loading.update(`Deleted ${Math.floor(Math.random() * 100)} post drafts`);
            await (0, helpers_1.sleep)(1500);
            await ctx.loading.update('Skipped 13 published posts');
            await (0, helpers_1.sleep)(700);
            await ctx.loading.update('Deleted 13 comments');
            await (0, helpers_1.sleep)(1000);
            return { email };
        },
        helloCurrentUser: {
            name: 'Hello, current user!',
            description: '👋',
            handler: async () => {
                console.log(index_1.ctx.params);
                let heading = `Hello, ${index_1.ctx.user.firstName} ${index_1.ctx.user.lastName}`;
                if (index_1.ctx.params.message) {
                    heading += ` (Message: ${index_1.ctx.params.message})`;
                }
                return heading;
            },
        },
        dates: async (io) => {
            const [date, time, datetime] = await io.group([
                io.input.date('Enter a date', {
                    min: {
                        year: 2020,
                        month: 1,
                        day: 1,
                    },
                    max: {
                        year: 3000,
                        month: 12,
                        day: 30,
                    },
                }),
                io.input.time('Enter a time', {
                    min: {
                        hour: 8,
                        minute: 30,
                    },
                    max: {
                        hour: 20,
                        minute: 0,
                    },
                }),
                io.input.datetime('Enter a datetime', {
                    defaultValue: new Date(),
                    min: new Date(),
                }),
                io.input.text('Text input'),
            ]);
            await io.display.object('Result', { data: { date, time, datetime } });
            return datetime;
        },
        validityTester: async (io) => {
            await io
                .group([
                io.input.number('Enter a number'),
                io.input.number('Enter a second number').optional(),
                io.input
                    .text('First name', {
                    maxLength: 20,
                })
                    .validate(async (result) => {
                    await (0, helpers_1.sleep)(2000);
                    if (result !== 'Jacob')
                        return 'Must be Jacob.';
                }),
                io.input
                    .text('Last name', {
                    minLength: 5,
                })
                    .optional(),
                io.input.email('Email'),
                io.input.email('Backup email').optional(),
            ])
                .validate(([, , firstName, lastName]) => {
                if (lastName === undefined && firstName === 'Jacob')
                    return;
                if (firstName === 'Jacob' && lastName !== 'Mischka') {
                    return 'Last name is not correct.';
                }
            });
        },
        optionalCheckboxes: async (io) => {
            const options = [
                {
                    value: 0,
                    label: 0,
                    extraData: 'A',
                },
                {
                    value: new Date(2022, 6, 1),
                    label: new Date(2022, 6, 1),
                    extraData: 'B',
                },
                {
                    value: true,
                    label: true,
                    extraData: 'C',
                },
            ];
            const defaultValue = await io.select.multiple('Select zero or more', {
                options,
            });
            index_1.ctx.log(defaultValue);
            const selected = await io.select
                .multiple('Modify the selection, selecting between 1 and 2', {
                options,
                defaultValue,
                minSelections: 1,
                maxSelections: 2,
            })
                .optional();
            index_1.ctx.log(selected);
        },
        update_email_for_user: editEmail_1.default,
        richText: async (io) => {
            const [body, to] = await io.group([
                io.input.richText('Enter email body', {
                    defaultValue: '<h2>Welcome to Interval!</h2><p>Enjoy your stay.</p>',
                    helpText: 'This will be sent to the user.',
                }),
                io.input.email('Email address'),
            ]);
            await io.display.markdown(`
          ## You entered:

          To: ${to}

          ~~~html
          ${body}
          ~~~
      `);
        },
        ImportUsers: async (io) => {
            await io.display.table('Users', {
                data: [
                    {
                        email: 'carsta.rocha@example.com',
                        phone_number: '(60) 1416-4953',
                        birthdate: '1993-08-04',
                        first_name: 'carsta',
                        last_name: 'rocha',
                        photo: 'photos/21351234.jpg',
                        website_url: 'https://example.com',
                    },
                    {
                        email: 'irene.morales@example.org',
                        phone_number: '625-790-958',
                        birthdate: '1982-04-28',
                        first_name: 'irene',
                        last_name: 'morales',
                        picture: 'photos/8321527.jpg',
                        website_url: 'https://example.org',
                    },
                ],
                columns: [
                    {
                        label: 'Name',
                        renderCell: row => `${row.first_name} ${row.last_name}`,
                    },
                    {
                        label: 'Birth date',
                        renderCell: row => {
                            const [y, m, d] = row.birthdate.split('-').map(s => Number(s));
                            const birthDate = new Date(y, m - 1, d);
                            return {
                                label: birthDate.toLocaleDateString(),
                                value: birthDate,
                            };
                        },
                    },
                    {
                        label: 'Website',
                        renderCell: row => ({
                            label: row.website_url,
                            url: row.website_url,
                        }),
                    },
                    {
                        label: 'Edit action',
                        renderCell: row => ({
                            label: 'Edit user',
                            action: 'edit_user',
                            params: {
                                email: row.email,
                            },
                        }),
                    },
                ],
                orientation: 'horizontal',
            });
        },
        edit_user: async (io, ctx) => {
            const { email } = ctx.params;
            await io.display.markdown(`Perform work for the user with the email \`${email}\``);
            return { email };
            // const user = lookupUserByEmail(email)
            // Edit user
        },
        'Display-Might-Return-Automatically': async (io) => {
            await io.group([
                io.display.markdown(`
          After you press continue, a long running task will start.
        `),
                io.input.text('Your name'),
            ]);
            console.log(1);
            await io.display.heading('Maybe? Blocking until you press continue');
            await (0, helpers_1.sleep)(2000);
            io.display
                .markdown(`Can always hack immedate returns with \`.then()\``)
                .then(() => { });
            await (0, helpers_1.sleep)(2000);
            await io.group([
                io.display.markdown('Displays in a group'),
                io.display.markdown('Will block unless auto-continue feature flag is set'),
            ]);
            console.log(2);
            await (0, helpers_1.sleep)(2000);
            console.log('Done!');
        },
        Render_markdown: async (io) => {
            await io.group([
                io.display.markdown(`
- one
  - two
    - three
      - four
        `),
                // contents taken from tailwind typography demo
                io.display.markdown(`
          # What to expect from here on out

          _This has been adapted from the [Tailwind](https://tailwindcss.com) typography plugin demo._

          What follows from here is just a bunch of absolute nonsense I've written to demo typography. It includes every sensible typographic element I could think of, like **bold text**, unordered lists, ordered lists, code blocks, block quotes, and _even italics_.

          It's important to cover all of these use cases for a few reasons:

          1. We want everything to look good out of the box.
          2. Really just the first reason, that's the whole point of the plugin.
          3. Here's a third pretend reason though a list with three items looks more realistic than a list with two items.

          Now we're going to try out another header style.

          ## Typography should be easy

          So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.

          Something a wise person once told me about typography is:

          > Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.

          Now I'm going to show you an example of an unordered list to make sure that looks good, too:

          - Here is the first item in this list.
          - Let's try longer, more complex list items:
            - This is a sub-list-item.
          - And this is the last item in the list.

          ### What does code look like?

          Code blocks should look okay by default, although most people will probably want to use \`io.display.code\`:

          \`\`\`typescript
          new Action({
            name: 'Render markdown',
            handler: async () => {
              // ...
            }
          })
          \`\`\`

          #### And finally, an H4

          And that's the end of this demo.
        `),
                io.select.multiple('Erase user data', {
                    options: [
                        {
                            label: 'Erase',
                            value: 'erase',
                        },
                    ],
                }),
            ]);
        },
        Render_object: async (io) => {
            await io.group([
                io.display.object('User', {
                    data: {
                        name: 'Interval',
                        action: { isTrue: true, createdAt: new Date() },
                    },
                }),
                io.select.multiple('Continue?', {
                    options: [
                        {
                            label: 'Continue',
                            value: 'Continue',
                        },
                    ],
                }),
            ]);
        },
        Progress_steps: async (io, ctx) => {
            await ctx.loading.start('Fetching users...');
            // await sleep(1000)
            const users = await helpers_1.fakeDb
                .find('')
                .then(res => res.map(helpers_1.mapToIntervalUser).slice(0, 3));
            await io.display.table('Users to process', {
                data: users,
            });
            const shouldContinue = await io.confirm('Are you sure you want to delete these users?');
            if (!shouldContinue) {
                throw new Error('Did not continue');
            }
            await ctx.loading.start({
                label: 'Updating users',
                itemsInQueue: users.length,
            });
            for (const _ of users) {
                await (0, helpers_1.sleep)(1000);
                await ctx.loading.completeOne();
            }
            // final text input to make sure loading isn't getting clobbered
            await io.input.text('Your name').optional();
            await (0, helpers_1.sleep)(1000);
        },
        loading_dos: async () => {
            const itemsInQueue = 100000;
            await index_1.ctx.loading.start({
                label: 'Migrating users',
                description: 'There are a lot, but they are very fast',
                itemsInQueue,
            });
            for (let i = 0; i < itemsInQueue; i++) {
                await index_1.ctx.loading.completeOne();
            }
        },
        loading_clobber: async () => {
            await index_1.ctx.loading.start('Loading...');
            await (0, helpers_1.sleep)(500);
            (0, helpers_1.sleep)(200).then(() => {
                index_1.ctx.loading.update({ description: 'Still loading!' });
            });
            await index_1.io.display.markdown('An IO input');
            await index_1.ctx.loading.start('Loading again...');
            await (0, helpers_1.sleep)(500);
        },
        log_dos: async () => {
            for (let i = 0; i < 2000; i++) {
                index_1.ctx.log(i);
            }
        },
        echoParams: async (io, ctx) => {
            ctx.log(ctx.params);
            await io.display.object('Params', {
                data: ctx.params,
            });
            return ctx.params;
        },
        invalid_props: async (io) => {
            await io.select.single('This is broken', {
                options: [
                    { label: 'Works', value: 'works' },
                    // @ts-expect-error
                    { label: "Doesn't" },
                ],
            });
        },
        a_readonly_demo: async (io) => {
            await io.group([
                io.input.text('Full name', { defaultValue: 'Interval' }),
                io.input.email('Email address', {
                    defaultValue: 'hello@interval.com',
                }),
                io.input.date('Start date', {
                    defaultValue: new Date(),
                }),
                io.input.boolean('Subscribe to newsletter?', {
                    defaultValue: true,
                }),
            ], {
                continueButton: { label: 'Start trial' },
            });
            await io.group([
                io.input.text('User ID', {
                    disabled: true,
                    defaultValue: 'cle6jrr5s0000ncl74lza8q6v',
                    helpText: 'This is a disabled io.input.text',
                }),
                io.display.table('Associated users', {
                    data: [
                        {
                            email: 'carsta.rocha@example.com',
                            phone_number: '(60) 1416-4953',
                            birthdate: '1993-08-04',
                            first_name: 'carsta',
                            last_name: 'rocha',
                            photo: 'photos/21351234.jpg',
                            website_url: 'https://example.com',
                        },
                        {
                            email: 'irene.morales@example.org',
                            phone_number: '625-790-958',
                            birthdate: '1982-04-28',
                            first_name: 'irene',
                            last_name: 'morales',
                            picture: 'photos/8321527.jpg',
                            website_url: 'https://example.org',
                        },
                    ],
                }),
            ]);
            return 'Done!';
        },
        append_ui_scroll_demo: async (io) => {
            let i = 0;
            while (i < 3) {
                await io.group([
                    io.input
                        .number('United States Dollar', {
                        min: 10,
                        currency: 'USD',
                    })
                        .optional(),
                    io.input
                        .number('Euro', {
                        currency: 'EUR',
                    })
                        .optional(),
                    io.input
                        .number('Japanese yen', {
                        currency: 'JPY',
                        decimals: 3,
                    })
                        .optional(),
                ]);
                i++;
            }
        },
        error: async (io) => {
            class CustomError extends Error {
                constructor() {
                    super(...arguments);
                    this.name = 'CustomError';
                }
            }
            const errors = [
                new Error('This is a regular error'),
                new TypeError('This is a type error.'),
                new CustomError('This is a custom error!'),
            ];
            const selected = await io.select.single('Select an error', {
                options: errors.map((e, i) => ({ label: e.name, value: i.toString() })),
            });
            throw errors[Number(selected.value)];
        },
        money: async (io) => {
            const [usd, eur, jpy] = await io.group([
                io.input.number('United States Dollar', {
                    min: 10,
                    currency: 'USD',
                }),
                io.input.number('Euro', {
                    currency: 'EUR',
                }),
                io.input.number('Japanese yen', {
                    currency: 'JPY',
                    decimals: 3,
                }),
            ]);
            return { usd, eur, jpy };
        },
        actionLinks,
        globalIO: async () => {
            await index_1.io.display.markdown(`Hello from \`${index_1.ctx.action.slug}!\``);
        },
        notifications: async (io, ctx) => {
            let deliveries = [];
            while (true) {
                const [_heading, to, method, moreDeliveries] = await io.group([
                    io.display.heading("Let's send a notification"),
                    io.input.text('to'),
                    io.select
                        .single('method', {
                        options: [
                            { label: 'SLACK', value: 'SLACK' },
                            { label: 'EMAIL', value: 'EMAIL' },
                        ],
                    })
                        .optional(),
                    io.input.boolean('Send to another destination?'),
                ]);
                deliveries.push({
                    to,
                    method: method === null || method === void 0 ? void 0 : method.value,
                });
                ctx.log('Current delivery array:', deliveries);
                if (!moreDeliveries)
                    break;
            }
            const [message, title] = await io.group([
                io.input.text('What message would you like to send?'),
                io.input
                    .text('Optionally provide a title', {
                    helpText: 'This will otherwise default to the name of the action',
                })
                    .optional(),
            ]);
            await ctx.notify({
                message,
                title,
                delivery: deliveries,
            });
            return { message: 'OK, notified!' };
        },
        uploads: new index_1.Page({
            name: 'Uploads',
            routes: {
                custom_destination: async (io) => {
                    const customDestinationFile = await io.input.file('Upload an image!', {
                        helpText: 'Will be uploaded to the custom destination.',
                        allowedExtensions: ['.gif', '.jpg', '.jpeg', '.png'],
                        generatePresignedUrls: async ({ name }) => {
                            const urlSafeName = name.replace(/ /g, '-');
                            const path = `custom-endpoint/${new Date().getTime()}-${urlSafeName}`;
                            return (0, upload_1.generateS3Urls)(path);
                        },
                    });
                    console.log(await customDestinationFile.url());
                    const { text, json, buffer, url, ...rest } = customDestinationFile;
                    return {
                        ...rest,
                        url: await url(),
                        text: rest.type.includes('text/')
                            ? await text().catch(err => {
                                console.log('Invalid text', err);
                                return undefined;
                            })
                            : undefined,
                        json: rest.type.includes('text/')
                            ? await json()
                                .then(obj => JSON.stringify(obj))
                                .catch(err => {
                                console.log('Invalid JSON', err);
                                return undefined;
                            })
                            : undefined,
                    };
                },
                single: async (io) => {
                    const file = await io.input.file('Upload an image!', {
                        helpText: 'Will be uploaded to Interval and expire after the action finishes running.',
                        allowedExtensions: ['.gif', '.jpg', '.jpeg', '.png'],
                    });
                    await io.display.image(file.name, {
                        url: await file.url(),
                    });
                    return file.name;
                },
                multiple: async (io) => {
                    const files = await io.input
                        .file('Upload an image!', {
                        helpText: 'Will be uploaded to Interval and expire after the action finishes running.',
                        allowedExtensions: ['.gif', '.jpg', '.jpeg', '.png'],
                    })
                        .multiple()
                        .optional();
                    if (!files)
                        return 'None selected.';
                    await io.group((await Promise.all(files.map(async (file) => [
                        io.display.image(file.name, {
                            url: await file.url(),
                        }),
                    ]))).map(([p]) => p));
                    return Object.fromEntries(files.map((file, i) => [i, file.name]));
                },
            },
        }),
        advanced_data: async (io) => {
            const data = {
                bigInt: BigInt(5),
                map: new Map([
                    ['a', 1],
                    ['b', 2],
                ]),
                set: new Set(['a', 'b', 'c']),
            };
            await io.display.object('Object', {
                data,
            });
            return data.bigInt;
        },
        malformed: async (io) => {
            // @ts-expect-error: Ensuring we can handle invalid calls
            await io.input.text(new Error(), {
                this: BigInt(12),
                // @ts-expect-error: Ensuring we can handle invalid calls
                something: this.something,
            });
        },
        badMessage: async () => {
            const client = new IntervalClient_1.default(interval, interval.config);
            // @ts-expect-error: Intentionally using private method
            await client.initializeConnection();
            // @ts-expect-error: Intentionally using protected method
            await client.__dangerousInternalSend('NONEXISTANT', {
                gibberish: '1234',
                error: new Error(),
            });
        },
        url: async () => {
            const url = await index_1.io.input.url('Enter a URL', {
                helpText: 'This is help text',
                placeholder: 'https://google.com',
                allowedProtocols: ['https'],
            });
            return { url: url.href };
        },
        redirect: async () => {
            const [url, , route, paramsStr] = await index_1.io.group([
                index_1.io.input.url('Enter a URL').optional(),
                index_1.io.display.markdown('--- or ---'),
                index_1.io.input.text('Enter an action slug').optional(),
                index_1.io.input
                    .text('With optional params', {
                    multiline: true,
                })
                    .optional(),
            ]);
            let params = undefined;
            if (url) {
                await index_1.ctx.redirect({ url: url.toString() });
            }
            else if (route) {
                if (paramsStr) {
                    try {
                        params = JSON.parse(paramsStr);
                    }
                    catch (err) {
                        index_1.ctx.log('Invalid params object', paramsStr);
                    }
                }
                await index_1.ctx.redirect({ route, params });
            }
            else {
                throw new Error('Must enter either a URL or an action slug');
            }
            console.log({
                url,
                route,
                params,
            });
            return {
                url: url === null || url === void 0 ? void 0 : url.toString(),
                route,
                paramsStr,
            };
        },
        continue_button: async () => {
            const url = await index_1.io.group([index_1.io.input.text('Important data')], {
                continueButton: {
                    label: 'Delete the data',
                    theme: 'danger',
                },
            });
            return 'All done!';
        },
        with_choices: async () => {
            let { choice: singleChoice, returnValue: singleReturnValue } = await index_1.io.input
                .number('Enter a number')
                .optional()
                .withChoices([
                { label: 'Make it negative', theme: 'danger', value: 'negative' },
                { label: 'Do nothing', value: 'nothing' },
                'Think about it for a while',
                'Restart',
            ]);
            if (singleChoice === 'Restart') {
                await index_1.ctx.redirect({ route: 'with_choices' });
                return;
            }
            if (singleReturnValue && singleChoice === 'negative') {
                singleReturnValue = -singleReturnValue;
            }
            await (0, helpers_1.sleep)(2000);
            await index_1.io.display
                .heading(`The number is now ${singleReturnValue}`)
                .withChoices([
                {
                    label: 'OK!',
                    value: 'ok',
                },
            ]);
            const { choice: fileChoice, returnValue: fileReturnValue } = await index_1.io.input
                .file('Upload a file')
                .withChoices(['Encrypt'])
                .multiple()
                .optional();
            index_1.ctx.log('choice', fileChoice);
            index_1.ctx.log('returnValue', fileReturnValue);
            const { choice: groupChoice, returnValue: { data: groupReturn }, } = await index_1.io
                .group({ data: index_1.io.input.text('Important data') })
                .withChoices([
                {
                    label: 'Delete the data',
                    value: 'delete',
                    theme: 'danger',
                },
                {
                    label: 'Cancel',
                    value: 'cancel',
                    theme: 'secondary',
                },
            ]);
            return {
                groupChoice,
                groupReturn,
            };
        },
        select_single: async () => {
            const selected = await index_1.io.select.single('Select an item', {
                options: [
                    { label: 'Item 1', value: 1 },
                    { label: 'Item 2', value: 2 },
                    { label: 'Item 3', value: 3 },
                    { label: 'Item 4', value: 4 },
                    { label: 'Item 5', value: 5 },
                    { label: 'Item 6', value: 6 },
                    { label: 'Item 7', value: 7 },
                    { label: 'Item 8', value: 8 },
                ],
            });
            return selected;
        },
        slider: async () => {
            const { maxLength, temperature } = await index_1.io.group({
                text: index_1.io.input.text('Text input').optional(),
                maxLength: index_1.io.input.slider('Maximum length', {
                    min: 1,
                    max: 2048,
                    step: 1,
                    defaultValue: 512,
                }),
                temperature: index_1.io.input.slider('Temperature', {
                    min: 0,
                    max: 2,
                    step: 0.01,
                    defaultValue: 1,
                }),
                topP: index_1.io.input.slider('Top P', {
                    min: 0,
                    max: 1,
                    step: 0.01,
                    defaultValue: 1,
                    helpText: 'Controls diversity via nucleus sampling: 0.5 means half of all likelihood- weighted options are considered.',
                }),
                frequencyPenalty: index_1.io.input.slider('Frequency penalty', {
                    min: 0,
                    max: 2,
                    step: 0.01,
                    defaultValue: 2,
                    disabled: true,
                    helpText: "How much to penalize new tokens based on their existing frequency in the text so far. Decreases the model's likelihood to repeat the same line verbatim.",
                }),
            });
            return { maxLength, temperature };
        },
        tables: new index_1.Page({
            name: 'Tables',
            routes: table_actions,
        }),
        grids: gridsPage,
        confirm_identity: confirmIdentity,
    },
});
interval.listen();
