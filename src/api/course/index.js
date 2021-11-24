const Router = require('koa-router');
const { write, list, read } = require('./course.ctrl');

const course = new Router();

course.post('/', write); // 과목 등록
course.get('/', list); // 전체 과목리스트
course.get('/:cid', read); // 특정 과목 조회

module.exports = course;
