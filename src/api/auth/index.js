const Router = require('koa-router');
const { register, login, check, logout } = require('./auth.ctrl');

const auth = new Router();

auth.post('/register', register);
auth.post('/login', login);
auth.get('/check', check);
auth.post('/logout', logout);

module.exports = auth;
