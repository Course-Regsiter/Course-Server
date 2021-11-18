const Router = require('koa-router');
const auth = require('./auth');
const course = require('./course');
const user = require('./user');

const api = new Router();

api.use('/auth', auth.routes());
api.use('/course', course.routes());
api.use('/user', user.routes());

module.exports = api;
