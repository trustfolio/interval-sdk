"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.async_grid = exports.empty_state = exports.long_descriptions = exports.music = exports.only_images = exports.no_images = exports.tiktoks = exports.dogs = void 0;
const experimental_1 = require("@interval/sdk/src/experimental");
const __1 = require("../..");
const faker_1 = require("@faker-js/faker");
const helpers_1 = require("../utils/helpers");
exports.dogs = new experimental_1.Action({
    name: 'Dogs',
    handler: async () => {
        const data = Array(50)
            .fill(null)
            .map((_, i) => ({
            id: i,
            name: faker_1.faker.name.middleName(),
            description: faker_1.faker.animal.dog(),
            image: faker_1.faker.image.imageUrl(480, Math.random() < 0.25 ? 300 : 480, 'dog', true),
        }));
        await __1.io.display.grid('These dogs are good', {
            data,
            idealColumnWidth: 200,
            renderItem: row => ({
                label: row.name,
                description: row.description,
                route: 'tables/display_table',
                image: {
                    url: row.image,
                    aspectRatio: 1,
                },
                menu: [
                    {
                        label: 'View',
                        route: 'tables/display_table',
                    },
                ],
            }),
        });
    },
});
exports.tiktoks = new experimental_1.Action({
    name: 'Top TikToks today',
    handler: async (io) => {
        const data = Array(50)
            .fill(null)
            .map((_, i) => ({
            id: i,
            label: `video from ${faker_1.faker.internet.userName()}`,
            description: faker_1.faker.date.past().toLocaleString(),
            image: faker_1.faker.image.animals(1080 / 4, 1920 / 4, true),
        }));
        await io.display.grid('', {
            data,
            idealColumnWidth: 220,
            renderItem: row => ({
                label: row.label,
                description: row.description,
                image: {
                    url: row.image,
                    aspectRatio: 9 / 16,
                },
                url: 'https://tiktok.com',
                menu: [
                    {
                        label: 'Flag',
                        route: 'tables/display_table',
                        theme: 'danger',
                    },
                    {
                        label: 'External link',
                        url: 'https://tiktok.com',
                    },
                ],
            }),
        });
    },
});
const no_images = async (io) => {
    const data = Array(50)
        .fill(null)
        .map((_, i) => ({
        id: i,
        label: faker_1.faker.commerce.productName(),
        description: faker_1.faker.commerce.price(100, 200, 0, '$'),
    }));
    await io.display.grid('', {
        data,
        idealColumnWidth: 300,
        renderItem: row => row,
    });
    await io.display.grid('', {
        data,
        idealColumnWidth: 300,
        renderItem: row => ({
            ...row,
            url: 'https://interval.com',
            menu: [
                {
                    label: 'View',
                    route: 'tables/display_table',
                },
            ],
        }),
    });
};
exports.no_images = no_images;
const only_images = async (io) => {
    const data = Array(50)
        .fill(null)
        .map((_, i) => ({
        id: i,
        name: faker_1.faker.name.middleName(),
        description: faker_1.faker.animal.dog(),
        image: faker_1.faker.image.imageUrl(480, Math.random() < 0.25 ? 300 : 480, 'dog', true),
    }));
    await io.display.grid('', {
        data,
        idealColumnWidth: 300,
        renderItem: row => ({
            action: 'grids/no_images',
            image: {
                url: row.image,
                aspectRatio: 4 / 3,
            },
        }),
        isFilterable: false,
    });
};
exports.only_images = only_images;
exports.music = new experimental_1.Action({
    name: 'Spotify library',
    handler: async (io) => {
        const data = Array(50)
            .fill(null)
            .map((_, i) => ({
            id: i,
            name: faker_1.faker.music.songName(),
            artists: faker_1.faker.name.fullName(),
            image: faker_1.faker.image.imageUrl(480, 480, 'abstract', true),
        }));
        await io.display.grid('', {
            data,
            idealColumnWidth: 240,
            renderItem: row => {
                var _a, _b;
                return ({
                    label: row.name,
                    description: row.artists,
                    image: {
                        url: row.image,
                        aspectRatio: 1,
                    },
                    url: 'https://open.spotify.com',
                    menu: [
                        {
                            label: 'Play on Spotify',
                            url: 'https://open.spotify.com',
                        },
                        {
                            label: 'Edit',
                            route: 'tables/display_table',
                            params: { id: (_a = row.id) !== null && _a !== void 0 ? _a : '' },
                        },
                        {
                            label: 'Delete',
                            route: 'tables/display_table',
                            params: { id: (_b = row.id) !== null && _b !== void 0 ? _b : '' },
                            theme: 'danger',
                        },
                    ],
                });
            },
        });
    },
});
exports.long_descriptions = new experimental_1.Action({
    name: 'Long descriptions',
    handler: async () => {
        const data = Array(50)
            .fill(null)
            .map((_, i) => ({
            id: i,
            name: faker_1.faker.name.middleName(),
            description: faker_1.faker.lorem.paragraph(),
            image: faker_1.faker.image.imageUrl(480, Math.random() < 0.25 ? 300 : 480, 'dog', true),
        }));
        await __1.io.display.grid('', {
            data,
            idealColumnWidth: 300,
            renderItem: row => ({
                label: row.name,
                description: row.description,
                image: {
                    url: row.image,
                    aspectRatio: 4 / 3,
                },
            }),
        });
    },
});
exports.empty_state = new experimental_1.Action({
    name: 'Empty state',
    handler: async () => {
        const data = Array(50)
            .fill(null)
            .map((_, i) => ({
            id: i,
            name: faker_1.faker.name.middleName(),
        }));
        await __1.io.display.grid('', {
            data: data.slice(0, 0),
            idealColumnWidth: 300,
            renderItem: row => ({
                label: row.name,
            }),
        });
    },
});
const async_grid = async (io) => {
    const allData = Array(500)
        .fill(null)
        .map((_, i) => ({
        id: i,
        name: faker_1.faker.name.middleName(),
        email: faker_1.faker.internet.email(),
        description: faker_1.faker.lorem.sentence(),
        image: i % 5 === 0 ? null : faker_1.faker.image.imageUrl(600, 300, 'dog', true),
    }));
    await io.display.grid('Display users', {
        renderItem: row => ({
            label: row.name,
            description: row.description,
            image: {
                url: row.image,
                aspectRatio: 2,
            },
        }),
        defaultPageSize: 30,
        async getData({ queryTerm, offset, pageSize }) {
            let filteredData = allData.slice();
            if (queryTerm) {
                const re = new RegExp(queryTerm, 'i');
                filteredData = filteredData.filter(row => {
                    return (re.test(row.name) || re.test(row.email) || re.test(row.description));
                });
            }
            await (0, helpers_1.sleep)(500);
            return {
                data: filteredData.slice(offset, offset + pageSize),
                totalRecords: filteredData.length,
            };
        },
    });
};
exports.async_grid = async_grid;
