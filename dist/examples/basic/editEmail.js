"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const helpers_1 = require("../utils/helpers");
const editEmailForUser = async (io) => {
    console.log("Let's say hello...");
    const resp = await io.group([
        io.display.heading('Edit email address for user'),
        io.search('Find a user', {
            placeholder: 'Search by name...',
            onSearch: async (query) => {
                return helpers_1.fakeDb.find(query);
            },
            renderResult: user => ({
                label: `${user.first_name} ${user.last_name}`,
                description: user.email,
                imageUrl: (0, helpers_1.getImageUrl)(user),
            }),
        }),
        io.select.single('Choose role', {
            options: [
                { label: 'Admin', value: 'a' },
                { label: 'Editor', value: 'b' },
                { label: 'Viewer', value: 'c' },
            ],
        }),
        io.input.text('Enter their new name'),
        io.input.email('Enter their new email', { placeholder: 'you@example.com' }),
        io.input.number('Enter an amount', {
            currency: 'USD',
        }),
        io.input.boolean('Are you sure?'),
        io.select.single('Select an opt', {
            options: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
            ],
        }),
        io.select.multiple('Select some opts', {
            options: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b' },
            ],
        }),
        io.select.table('Select from this table', {
            data: [
                { label: 'A', value: 'a' },
                { label: 'B', value: 'b', otherExtraData: 'ok' },
                { label: 'C', value: 'c', extraData: true },
            ],
        }),
    ]);
    const found = resp[1];
    console.log(found);
    await io.display.object('Response', { data: resp });
    console.log('Resp', resp);
};
exports.default = editEmailForUser;
