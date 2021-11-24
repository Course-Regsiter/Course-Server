const Router = require('koa-router');
const { isLoggedIn } = require('../../middleware/isLogged');
const { list, reserve, register, select, remove, preRemove } = require('./user.ctrl');

const user = new Router();

user.get('/course', isLoggedIn, list); // 수강 과목리스트
user.get('/preCourse', isLoggedIn, reserve); // 예비 과목리스트
user.post('/course', isLoggedIn, register); // 수강 신청
user.post('/preCourse', isLoggedIn, select); // 예비 수강 신청
user.delete('/course/:cid', isLoggedIn, remove); // 수강 삭제
user.delete('/preCourse/:cid', isLoggedIn, preRemove); // 예비 수강 삭제
preRemove
module.exports = user;
