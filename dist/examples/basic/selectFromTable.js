"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.table_custom_columns = exports.table_custom = exports.table_actions = exports.table_basic = void 0;
const faker_1 = require("@faker-js/faker");
const charges = [
    {
        id: 'b717a9cf-4a3e-41ab-bcda-e2f3ff35c974',
        name: 'Alex Arena',
        email: 'alex@interval.com',
        amount: 15000,
        purchasedAt: new Date(2022, 0, 15),
    },
    // need 3 rows so pagination is perceptible at 20 per page
    // {
    //   id: 'acc14b04-60d8-4f9d-9907-10ea1ed05fe2',
    //   name: 'Dan Philibin',
    //   email: 'dan@interval.com',
    //   amount: 0,
    //   promoCode: 'APPLE',
    //   purchasedAt: new Date(2015, 3, 22),
    // },
    {
        id: '91032195-6836-4573-9cd5-0b06ea2379ec',
        name: 'Jacob Mischka',
        email: 'jacob@interval.com',
        amount: 1200,
        promoCode: 'BANANA',
        arr: [1, 2, 3],
        purchasedAt: new Date(2018, 10, 7),
    },
    {
        id: '48d10a1a-9c8c-4426-8d0c-796610c652f3',
        name: 'Ryan Coppolo',
        email: 'ryan@interval.com',
        amount: 2022,
        promoCode: 'ORANGE',
        nested: {
            a: 'b',
        },
        purchasedAt: new Date(2000, 12, 15),
    },
];
function formatCurrency(amount) {
    return amount.toLocaleString('en-US', { currency: 'usd', style: 'currency' });
}
const table_basic = async (io) => {
    const simpleCharges = charges.map(ch => ({
        name: ch.name,
        email: faker_1.faker.internet.email(),
        amount: ch.amount,
    }));
    const [name, phone, selections] = await io.group([
        io.input.text('Full name'),
        io.input.text('Phone number'),
        io.select.table('Select a person', {
            data: [...simpleCharges, ...simpleCharges],
            minSelections: 1,
            maxSelections: 3,
        }),
    ]);
    await io.display.object('Selected', { data: selections });
};
exports.table_basic = table_basic;
const table_actions = async (io) => {
    const simpleCharges = charges.map((ch, idx) => ({
        id: idx,
        name: ch.name,
        email: faker_1.faker.internet.email(),
        amount: ch.amount,
        address1: faker_1.faker.address.streetAddress(),
        address2: faker_1.faker.address.secondaryAddress(),
        city: faker_1.faker.address.city(),
        state: faker_1.faker.address.state(),
        zip: faker_1.faker.address.zipCode(),
    }));
    const selections = await io.display.table('Charges', {
        data: simpleCharges,
        rowMenuItems: row => [
            {
                label: 'Edit',
                route: 'edit_user',
                params: { email: row.email },
            },
        ],
    });
    await io.display.object('Selected', { data: selections });
};
exports.table_actions = table_actions;
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
    const [rowsCount, fields, tableType, orientation, defaultPageSize] = await io.group([
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
            defaultValue: { label: 'Select', value: 'select' },
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
            .number('Default page size', {
            defaultValue: 20,
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
            defaultPageSize,
        });
    }
    else {
        const [selections] = await io.select.table('Select a person', {
            data: rows,
            minSelections: 1,
            maxSelections: 3,
            defaultPageSize,
        });
        await io.display.object('Selected', { data: selections });
    }
};
exports.table_custom = table_custom;
const table_custom_columns = async (io) => {
    const selections = await io.select
        .table('Select from this table', {
        data: [
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
            ...charges,
        ],
        columns: [
            {
                label: 'ID',
                renderCell: row => ({
                    label: row.name === 'Dan Philibin'
                        ? 'b49db41314a645edabee-1c5eae1255df'
                        : row.name === 'Jacob Mischka'
                            ? `https://dashboard.stripe.com/${row.id}`
                            : 'This is a long string of multiline text that is linked in a table column',
                    url: `https://dashboard.stripe.com/${row.id}`,
                }),
            },
            {
                label: 'Name',
                renderCell: row => row.name,
            },
            {
                label: 'Email',
                renderCell: row => row.email,
            },
            {
                label: 'Number',
                renderCell: row => row.amount,
            },
            {
                label: 'Price',
                renderCell: row => ({
                    label: formatCurrency(row.amount ? row.amount / 100 : 0),
                    value: row.amount,
                }),
            },
            {
                label: 'Promo code',
                renderCell: (row) => ({
                    label: row.promoCode,
                }),
            },
            {
                label: 'Purchased at',
                renderCell: (row) => ({
                    label: row.purchasedAt.toLocaleString(),
                    value: row.purchasedAt,
                }),
            },
        ],
        minSelections: 1,
        maxSelections: 2,
        defaultPageSize: Infinity,
    })
        .optional();
    await io.display.object('Selected', { data: selections });
};
exports.table_custom_columns = table_custom_columns;
