const Router = require('koa-router');
const course = require('./course');
const user = require('./user');

const api = new Router();

api.use('/course', course.routes());
api.use('/user', user.routes());

module.exports = api;
