"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSubscription = exports.getSubscriptions = exports.getComment = exports.getComments = exports.getUser = exports.getUsers = void 0;
const faker_1 = require("@faker-js/faker");
faker_1.faker.seed(0);
const allUsers = Array.from({ length: 313 }, () => {
    return {
        id: faker_1.faker.datatype.uuid(),
        firstName: faker_1.faker.name.firstName(),
        lastName: faker_1.faker.name.lastName(),
        email: faker_1.faker.internet.email(),
        createdAt: faker_1.faker.date.recent(30),
    };
}).sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
});
function getUsers() {
    return allUsers;
}
exports.getUsers = getUsers;
function getUser(id) {
    var _a;
    return (_a = allUsers.find(user => user.id === id)) !== null && _a !== void 0 ? _a : null;
}
exports.getUser = getUser;
const allComments = Array.from({ length: 313 }, () => {
    return {
        id: faker_1.faker.datatype.uuid(),
        createdAt: faker_1.faker.date.recent(30),
        userId: faker_1.faker.helpers.arrayElement(allUsers).id,
        message: faker_1.faker.hacker.phrase(),
    };
}).sort((a, b) => {
    return b.createdAt.getTime() - a.createdAt.getTime();
});
function getComments() {
    return allComments;
}
exports.getComments = getComments;
function getComment(id) {
    var _a;
    return (_a = allComments.find(c => c.id === id)) !== null && _a !== void 0 ? _a : null;
}
exports.getComment = getComment;
const allSubscriptions = Array.from({ length: 313 }, () => {
    return {
        id: faker_1.faker.datatype.uuid(),
        createdAt: faker_1.faker.date.recent(30),
        userId: faker_1.faker.helpers.arrayElement(allUsers).id,
        plan: faker_1.faker.helpers.arrayElement(['Basic', 'Premium', 'Enterprise']),
        status: faker_1.faker.helpers.arrayElement(['active', 'canceled', 'past_due']),
    };
});
function getSubscriptions() {
    return allSubscriptions;
}
exports.getSubscriptions = getSubscriptions;
function getSubscription(id) {
    var _a;
    return (_a = allSubscriptions.find(s => s.id === id)) !== null && _a !== void 0 ? _a : null;
}
exports.getSubscription = getSubscription;
