const Router = require('koa-router');
const { isLoggedIn } = require('../../middleware/isLogged');
const { list, register, remove } = require('./user.ctrl');

const user = new Router();

user.get('/course', isLoggedIn, list);
user.post('/course', isLoggedIn, register);
user.delete('/course/:cid', isLoggedIn, remove);
module.exports = user;
