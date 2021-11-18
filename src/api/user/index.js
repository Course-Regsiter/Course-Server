const Router = require('koa-router');
const { reserved, confirmed, add, remove } = require('./user.ctrl');

const user = new Router();

// 예비 리스트
user.get('/reserved', reserved);
// 확정 리스트
user.get('/confirmed', confirmed);
user.post('/confirmed', add);
user.delete('/confirmed', remove);
module.exports = user;
