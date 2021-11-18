const Router = require('koa-router');
const { write, list } = require('./course.ctrl');

const course = new Router();

// course.post('/', write);
course.get('/', list);

module.exports = course;
