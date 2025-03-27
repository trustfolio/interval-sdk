"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const unauthorized = async (io) => {
    const email = await io.input.email('Email address');
    if (!email.includes('@interval.com')) {
        throw new Error('Unauthorized');
    }
    const name = await io.input.text('Name');
    return {
        name,
        email,
        'Download data': 'https://interval.com/export.zip',
    };
};
exports.default = unauthorized;
