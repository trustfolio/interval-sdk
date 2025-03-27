"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateRows = exports.fakeDb = exports.mapToIntervalUser = exports.mapToSelectOption = exports.getImageUrl = exports.sleep = void 0;
const faker_1 = require("@faker-js/faker");
const dedent_1 = __importDefault(require("dedent"));
const fakeUsers_1 = __importDefault(require("./fakeUsers"));
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
}
exports.sleep = sleep;
function getImageUrl(inputUser) {
    const name = `${inputUser.first_name} ${inputUser.last_name}`;
    return `https://avatars.dicebear.com/api/pixel-art/${encodeURIComponent(name)}.svg?scale=96&translateY=10`;
}
exports.getImageUrl = getImageUrl;
function mapToSelectOption(inputUser) {
    const name = `${inputUser.first_name} ${inputUser.last_name}`;
    return {
        ...inputUser,
        value: inputUser.username,
        label: name,
        description: inputUser.email,
        imageUrl: `https://avatars.dicebear.com/api/pixel-art/${encodeURIComponent(name)}.svg?scale=96&translateY=10`,
    };
}
exports.mapToSelectOption = mapToSelectOption;
function mapToIntervalUser(inputUser) {
    const name = `${inputUser.first_name} ${inputUser.last_name}`;
    return {
        id: inputUser.username,
        name: name,
        email: inputUser.email,
        imageUrl: `https://avatars.dicebear.com/api/pixel-art/${encodeURIComponent(name)}.svg?scale=96&translateY=10`,
    };
}
exports.mapToIntervalUser = mapToIntervalUser;
exports.fakeDb = (function fakeDb() {
    const data = fakeUsers_1.default;
    return {
        async find(input) {
            await sleep(500);
            const inputLower = input.toLowerCase();
            return data
                .filter(v => {
                const searchStr = (v.email + v.first_name + v.last_name).toLowerCase();
                return searchStr.includes(inputLower);
            })
                .slice(0, 10);
        },
    };
})();
function generateRows(count, offset = 0) {
    return Array(count)
        .fill(null)
        .map((_, i) => ({
        id: offset + i,
        name: `${faker_1.faker.name.firstName()} ${faker_1.faker.name.lastName()}`,
        email: faker_1.faker.internet.email(),
        description: faker_1.faker.helpers.arrayElement([
            faker_1.faker.random.word(),
            faker_1.faker.random.words(),
            faker_1.faker.lorem.paragraph(),
            (0, dedent_1.default) `## ${faker_1.faker.random.words()}

        ${faker_1.faker.random.words()}
        `,
            `${faker_1.faker.random.words()} **${faker_1.faker.random.word()}** ${faker_1.faker.random.words()}`,
            `${faker_1.faker.random.words()} _${faker_1.faker.random.word()}_ ${faker_1.faker.random.words()}`,
            `${faker_1.faker.random.words()} [${faker_1.faker.random.word()}](${faker_1.faker.internet.url()}) ${faker_1.faker.random.words()}`,
            (0, dedent_1.default) `- ${faker_1.faker.random.word()}
         - ${faker_1.faker.random.word()}
         - ${faker_1.faker.random.word()}
        `,
            (0, dedent_1.default) `1. ${faker_1.faker.random.word()}
         2. ${faker_1.faker.random.word()}
         3. ${faker_1.faker.random.word()}
        `,
            `Here is \`inline code\``,
            (0, dedent_1.default) `~~~ts
        console.log("hello, world!");
        ~~~`,
        ]),
        number: faker_1.faker.datatype.number(100),
        ...Object.fromEntries(Array(50)
            .fill(null)
            .map((_, i) => [`text_${i}`, faker_1.faker.lorem.paragraph()])),
        boolean: faker_1.faker.datatype.boolean(),
        date: faker_1.faker.datatype.datetime(),
        image: faker_1.faker.image.imageUrl(480, Math.random() < 0.25 ? 300 : 480, undefined, true),
        array: Array(10)
            .fill(null)
            .map(() => faker_1.faker.word.noun()),
    }));
}
exports.generateRows = generateRows;
