"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.markdown = exports.big_table = exports.image_viewer = exports.table_custom = exports.select_table = exports.async_table = exports.async_table_page = exports.big_payload_table = exports.multiple_async_tables = exports.multiple_tables = exports.highlighted_rows = exports.display_table = exports.object_cell = exports.large_table = exports.empty = exports.paginated = exports.no_pagination = void 0;
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const fakeUsers_1 = __importDefault(require("../utils/fakeUsers"));
const helpers_1 = require("../utils/helpers");
const ioMethodWrappers_1 = require("../utils/ioMethodWrappers");
const dedent_1 = __importDefault(require("dedent"));
const no_pagination = async (io) => {
    const data = (0, helpers_1.generateRows)(5);
    await io.display.table('Display users', {
        data,
        defaultPageSize: 50,
        isFilterable: false,
        isSortable: false,
        rowMenuItems: () => [],
    });
};
exports.no_pagination = no_pagination;
const paginated = async (io) => {
    const data = (0, helpers_1.generateRows)(50);
    await io.display.table('Display users', {
        data,
        defaultPageSize: 10,
    });
};
exports.paginated = paginated;
const empty = async (io) => {
    const data = (0, helpers_1.generateRows)(5);
    await io.display.table('Display users', {
        columns: ['id', 'name', 'email'],
        data: data.slice(0, 0),
    });
};
exports.empty = empty;
exports.large_table = {
    name: '10k rows',
    handler: async (io) => {
        const data = (0, helpers_1.generateRows)(10000);
        await io.display.table('Display users', {
            data,
            defaultPageSize: Infinity,
        });
    },
};
exports.object_cell = {
    name: 'Object in cell',
    handler: async (io) => {
        const data = (0, helpers_1.generateRows)(10);
        await io.display.table('Display users', {
            getData: async (props) => {
                return {
                    data: data.map(({ date, ...rest }) => ({
                        date,
                        payload: rest,
                    })),
                    totalRecords: data.length,
                };
            },
            columns: ['date', 'payload'],
        });
    },
};
const display_table = async (io) => {
    const data = (0, helpers_1.generateRows)(200);
    await io.display.table('Display users', {
        data,
        defaultPageSize: 50,
        columns: [
            'id',
            {
                label: 'User',
                renderCell: row => ({
                    label: row.name,
                    image: {
                        alt: 'Alt tag',
                        url: row.image,
                        size: 'small',
                    },
                    highlightColor: 'blue',
                }),
            },
            {
                label: 'Email',
                accessorKey: 'email',
                renderCell: row => ({
                    label: row.email,
                    url: `mailto:${row.email}`,
                }),
            },
            {
                label: 'Description',
                accessorKey: 'description',
                renderCell: row => ({
                    label: row.description,
                }),
            },
            'boolean',
            'date',
            'array',
        ],
        rowMenuItems: row => [
            {
                label: 'Edit',
                route: 'edit_user',
                params: { email: row.email },
            },
            {
                label: 'Edit',
                route: 'edit_user',
                params: { email: row.email },
                disabled: true,
            },
            {
                label: 'Delete',
                route: 'delete_user',
                params: { email: row.email },
                theme: 'danger',
            },
            {
                label: 'Delete',
                route: 'delete_user',
                params: { email: row.email },
                theme: 'danger',
                disabled: true,
            },
            {
                label: 'External',
                url: 'https://google.com',
            },
        ],
    });
};
exports.display_table = display_table;
exports.highlighted_rows = new __1.Action(async () => {
    const data = (0, helpers_1.generateRows)(50);
    await __1.io.select.table('Select users', {
        data,
        defaultPageSize: 50,
        columns: [
            {
                label: 'User',
                renderCell: row => ({
                    label: row.name,
                    image: {
                        alt: 'Alt tag',
                        url: row.image,
                        size: 'small',
                    },
                    highlightColor: 'red',
                }),
            },
            {
                label: 'Email',
                renderCell: row => ({
                    url: `mailto:${row.email}`,
                    label: row.email,
                    highlightColor: 'orange',
                }),
            },
            {
                label: 'Description',
                accessorKey: 'description',
                renderCell: row => ({
                    label: row.description,
                    highlightColor: 'yellow',
                }),
            },
            {
                label: 'Date',
                accessorKey: 'date',
                renderCell: row => ({
                    label: row.date,
                    highlightColor: 'green',
                }),
            },
        ],
        rowMenuItems: row => [
            {
                label: 'Edit',
                route: 'edit_user',
                params: { email: row.email },
            },
            {
                label: 'Edit',
                route: 'edit_user',
                params: { email: row.email },
                disabled: true,
            },
            {
                label: 'Delete',
                route: 'delete_user',
                params: { email: row.email },
                theme: 'danger',
            },
            {
                label: 'Delete',
                route: 'delete_user',
                params: { email: row.email },
                theme: 'danger',
                disabled: true,
            },
            {
                label: 'External',
                url: 'https://google.com',
            },
        ],
    });
});
const multiple_tables = async (io) => {
    await io.group([
        io.display.table('Display users', {
            data: (0, helpers_1.generateRows)(10),
            defaultPageSize: 10,
        }),
        io.display.table('Display users', {
            data: (0, helpers_1.generateRows)(10),
            defaultPageSize: 10,
        }),
        io.display.table('Display users', {
            data: (0, helpers_1.generateRows)(10),
            defaultPageSize: 10,
        }),
        io.display.table('Display users', {
            data: (0, helpers_1.generateRows)(10),
            defaultPageSize: 10,
        }),
        io.display.table('Display users', {
            data: (0, helpers_1.generateRows)(10),
            defaultPageSize: 10,
        }),
    ]);
};
exports.multiple_tables = multiple_tables;
exports.multiple_async_tables = new __1.Page({
    name: 'Multiple async tables',
    handler: async () => {
        await (0, helpers_1.sleep)(200);
        return new __1.Layout({
            children: [
                (0, ioMethodWrappers_1.asyncTable)(100),
                (0, ioMethodWrappers_1.asyncTable)(300),
                (0, ioMethodWrappers_1.asyncTable)(800),
                (0, ioMethodWrappers_1.asyncTable)(300),
                (0, ioMethodWrappers_1.asyncTable)(200),
            ],
        });
    },
});
exports.big_payload_table = new __1.Page({
    name: 'Big table',
    handler: async () => {
        const bigData = (0, helpers_1.generateRows)(10000);
        return new __1.Layout({
            children: [
                __1.io.display.table('Large table', {
                    data: bigData,
                    // These don't work, they're just here to make the payload bigger
                    rowMenuItems: row => [
                        {
                            label: 'Browse app structure',
                            action: 'organizations/app_structure',
                            params: { org: row.email },
                        },
                        {
                            label: 'Change slug',
                            action: 'organizations/change_slug',
                            params: { org: row.email },
                        },
                        {
                            label: 'Enable SSO',
                            action: 'organizations/create_org_sso',
                            params: { org: row.email },
                        },
                        {
                            label: 'Toggle feature flag',
                            action: 'organizations/org_feature_flag',
                            params: { org: row.email },
                        },
                        {
                            label: 'Transfer owner',
                            action: 'organizations/transfer_ownership',
                            params: { org: row.email },
                        },
                    ],
                }),
            ],
        });
    },
});
exports.async_table_page = new __1.Page({
    name: 'Async table - in a page',
    handler: async () => {
        return new __1.Layout({
            children: [(0, ioMethodWrappers_1.asyncTable)(500)],
        });
    },
});
const async_table = async () => {
    await (0, ioMethodWrappers_1.asyncTable)(500);
};
exports.async_table = async_table;
const select_table = async (io) => {
    faker_1.faker.seed(0);
    const data = (0, helpers_1.generateRows)(500);
    const selected = await io.select.table('Display users', {
        data,
        defaultPageSize: 500,
        columns: [
            'id',
            {
                label: 'Description',
                accessorKey: 'description',
            },
            'number',
            'boolean',
            'date',
            {
                label: 'renderCell',
                renderCell: row => `${String(row.description).split(' ')[0]} ${row.number}`,
            },
            {
                label: 'Link',
                renderCell: row => ({ url: '#', label: row.email }),
            },
        ],
        minSelections: 1,
        rowMenuItems: row => [
            {
                label: 'Edit',
                route: 'edit_user',
                params: { email: row.email },
            },
        ],
        initiallySelected: row => row.id % 2 === 0,
    });
    await io.display.table('Display users', {
        data: selected,
        columns: [
            'description',
            'number',
            'boolean',
            'date',
            {
                label: 'renderCell',
                renderCell: row => `${row.description} ${row.number}`,
            },
            {
                label: 'Edit',
                renderCell: row => ({ url: '#', label: row.email }),
            },
        ],
    });
};
exports.select_table = select_table;
const table_custom = async (io) => {
    const options = [
        'id',
        'name',
        'email',
        'url',
        'number',
        'paragraph',
        'address1',
        'address2',
        'city',
        'state',
        'zip',
    ].map(f => ({ label: f, value: f }));
    const [rowsCount, fields, tableType, orientation, minSelections, maxSelections,] = await io.group([
        io.input.number('Number of rows', { defaultValue: 50 }),
        io.select.multiple('Fields', {
            options: options,
            defaultValue: options,
        }),
        io.select.single('Table type', {
            options: [
                { label: 'Display', value: 'display' },
                { label: 'Select', value: 'select' },
            ],
            defaultValue: { label: 'Display', value: 'display' },
        }),
        io.select.single('Orientation', {
            options: [
                { label: 'Horizontal', value: 'horizontal' },
                { label: 'Vertical', value: 'vertical' },
            ],
            defaultValue: { label: 'Horizontal', value: 'horizontal' },
            helpText: 'Warning: Vertical orientation is not supported for select tables; it will be ignored',
        }),
        io.input
            .number('Min selection', {
            min: 0,
        })
            .optional(),
        io.input
            .number('Max selection', {
            min: 0,
        })
            .optional(),
    ]);
    const rows = [];
    for (let i = 0; i < rowsCount; i++) {
        const row = {};
        for (const field of fields) {
            switch (field.value) {
                case 'id':
                    row[field.value] = faker_1.faker.datatype.uuid();
                    break;
                case 'name':
                    row[field.value] = faker_1.faker.name.findName();
                    break;
                case 'email':
                    row[field.value] = faker_1.faker.internet.email();
                    break;
                case 'url':
                    row[field.value] = faker_1.faker.internet.url();
                    break;
                case 'number':
                    row[field.value] = faker_1.faker.datatype.number();
                    break;
                case 'paragraph':
                    row[field.value] = faker_1.faker.lorem.paragraph();
                    break;
                case 'address1':
                    row[field.value] = faker_1.faker.address.streetAddress();
                    break;
                case 'address2':
                    row[field.value] = faker_1.faker.address.secondaryAddress();
                    break;
                case 'city':
                    row[field.value] = faker_1.faker.address.city();
                    break;
                case 'state':
                    row[field.value] = faker_1.faker.address.state();
                    break;
                case 'zip':
                    row[field.value] = faker_1.faker.address.zipCode();
                    break;
                default:
                    break;
            }
        }
        rows.push(row);
    }
    if (tableType.value === 'display') {
        await io.display.table('Table', {
            data: rows,
            orientation: orientation.value,
        });
    }
    else {
        const [selections] = await io.select.table('Select a person', {
            data: rows,
            minSelections,
            maxSelections,
        });
        await io.display.object('Selected', { data: selections });
    }
};
exports.table_custom = table_custom;
const image_viewer = async (io) => {
    const data = Array(50)
        .fill(null)
        .map((_, i) => {
        const [width, height, crazyW, crazyH, tinyW, tinyH] = [
            faker_1.faker.datatype.number({ min: 500, max: 700 }),
            faker_1.faker.datatype.number({ min: 200, max: 400 }),
            faker_1.faker.datatype.number({ min: 100, max: 999 }),
            faker_1.faker.datatype.number({ min: 100, max: 999 }),
            faker_1.faker.datatype.number({ min: 12, max: 20 }),
            faker_1.faker.datatype.number({ min: 12, max: 20 }),
        ];
        return {
            id: i,
            name: faker_1.faker.name.findName(),
            square: faker_1.faker.image.avatar(),
            width,
            height,
            crazyW,
            crazyH,
            tinyW,
            tinyH,
            wide: faker_1.faker.image.imageUrl(width, height, undefined, true),
            tall: faker_1.faker.image.imageUrl(height, width, undefined, true),
            crazy: faker_1.faker.image.imageUrl(crazyW, crazyH, undefined, true),
            tiny: faker_1.faker.image.imageUrl(tinyW, tinyH, undefined, true),
        };
    });
    await io.display.table('Images', {
        data,
        defaultPageSize: 10,
        columns: [
            'id',
            {
                label: 'Square',
                renderCell: row => ({
                    image: {
                        alt: 'Alt tag',
                        url: row.square,
                        size: 'small',
                    },
                }),
            },
            {
                label: 'Tall',
                renderCell: row => ({
                    label: `${row.height} x ${row.width}`,
                    image: {
                        alt: 'Alt tag',
                        url: row.tall,
                        size: 'small',
                    },
                }),
            },
            {
                label: 'Wide',
                renderCell: row => ({
                    label: `${row.width} x ${row.height}`,
                    image: {
                        alt: 'Alt tag',
                        url: row.wide,
                        size: 'small',
                    },
                }),
            },
            {
                label: 'Crazy',
                renderCell: row => ({
                    label: `${row.crazyW} x ${row.crazyH}`,
                    image: {
                        alt: 'Alt tag',
                        url: row.crazy,
                        size: 'small',
                    },
                }),
            },
            {
                label: 'Tiny',
                renderCell: row => ({
                    label: `${row.tinyW} x ${row.tinyH}`,
                    image: {
                        alt: 'Alt tag',
                        url: row.tiny,
                    },
                }),
            },
        ],
    });
    await io.display.table('Image sizes', {
        data,
        defaultPageSize: 10,
        columns: [
            'id',
            {
                label: 'None',
                renderCell: row => ({
                    image: {
                        alt: 'Alt tag',
                        url: row.wide,
                    },
                }),
            },
            {
                label: 'Thumbnail',
                renderCell: row => ({
                    image: {
                        alt: 'Alt tag',
                        url: row.wide,
                        size: 'thumbnail',
                    },
                }),
            },
            {
                label: 'Small',
                renderCell: row => ({
                    image: {
                        alt: 'Alt tag',
                        url: row.wide,
                        size: 'small',
                    },
                }),
            },
            {
                label: 'Medium',
                renderCell: row => ({
                    image: {
                        alt: 'Alt tag',
                        url: row.wide,
                        size: 'medium',
                    },
                }),
            },
            {
                label: 'Large',
                renderCell: row => ({
                    image: {
                        alt: 'Alt tag',
                        url: row.wide,
                        size: 'large',
                    },
                }),
            },
        ],
    });
};
exports.image_viewer = image_viewer;
exports.big_table = new __1.Page({
    name: 'Big table',
    handler: async () => {
        const bigData = [
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
            ...fakeUsers_1.default,
        ];
        return new __1.Layout({
            children: [
                __1.io.display.table('Large table', {
                    data: bigData,
                    // These don't work, they're just here to make the payload bigger
                    rowMenuItems: row => [
                        {
                            label: 'Browse app structure',
                            action: 'organizations/app_structure',
                            params: { org: row.email },
                        },
                        {
                            label: 'Change slug',
                            action: 'organizations/change_slug',
                            params: { org: row.email },
                        },
                        {
                            label: 'Enable SSO',
                            action: 'organizations/create_org_sso',
                            params: { org: row.email },
                        },
                        {
                            label: 'Toggle feature flag',
                            action: 'organizations/org_feature_flag',
                            params: { org: row.email },
                        },
                        {
                            label: 'Transfer owner',
                            action: 'organizations/transfer_ownership',
                            params: { org: row.email },
                        },
                    ],
                }),
            ],
        });
    },
});
exports.markdown = new __1.Page({
    name: 'Markdown',
    handler: async () => {
        return new __1.Layout({
            children: [
                __1.io.display.table('', {
                    data: [
                        {
                            index: 0,
                            label: 'Bulleted list',
                            value: (0, dedent_1.default) `Here are three bullet points:
                - ${faker_1.faker.random.word()}
                - ${faker_1.faker.random.word()}
                - ${faker_1.faker.lorem.paragraph()}
              
              And a [link](https://www.google.com/) at the end.
              `,
                        },
                        {
                            index: 1,
                            label: 'Numbered list',
                            value: (0, dedent_1.default) `1. ${faker_1.faker.random.word()}
                1. ${faker_1.faker.random.word()}
                1. ${faker_1.faker.lorem.paragraph()}
              `,
                        },
                        {
                            index: 2,
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
                        {
                            index: 3,
                            label: 'Code block with some text around it',
                            value: (0, dedent_1.default) `
                Here is some very good code:
                ~~~ts
                const foo: string = 'bar'
                if (foo === 'bar') {
                  console.log('foo is bar')
                } else {
                  console.log('foo is not bar')
                }
                ~~~
                
                Copy and paste that into your editor and you'll be good to go!`,
                        },
                        {
                            index: 4,
                            label: 'Inline code',
                            value: (0, dedent_1.default) `This is an example of \`inline code\`.`,
                        },
                        {
                            index: 5,
                            label: 'Some headings',
                            value: (0, dedent_1.default) `# Heading 1
              ${faker_1.faker.lorem.paragraph()}
              ## Heading 2
              ${faker_1.faker.lorem.paragraph()}
              ### Heading 3
              ${faker_1.faker.lorem.paragraph()}
              #### Heading 4
              ${faker_1.faker.lorem.paragraph()}
              ##### Heading 5
              ${faker_1.faker.lorem.paragraph()}
              ###### Heading 6
              ${faker_1.faker.lorem.paragraph()}`,
                        },
                        {
                            index: 6,
                            label: 'Other elements',
                            value: (0, dedent_1.default) `This is a [link](https://www.google.com/)

              This is a **bold** word, and then a quote:

              > ${faker_1.faker.lorem.paragraph()}

              This is a horizontal rule:

              ---
              
              ${faker_1.faker.lorem.paragraph()}
              `,
                        },
                        {
                            index: 7,
                            label: 'Paragraphs',
                            value: faker_1.faker.lorem.paragraphs(5, '\n\n'),
                        },
                    ],
                    columns: [
                        'label',
                        {
                            label: 'Value',
                            renderCell: row => ({
                                label: row.value,
                                highlightColor: [
                                    'red',
                                    'orange',
                                    'yellow',
                                    'green',
                                    'blue',
                                    'purple',
                                    'pink',
                                    'gray',
                                ][row.index],
                            }),
                        },
                        'index',
                    ],
                }),
            ],
        });
    },
});
