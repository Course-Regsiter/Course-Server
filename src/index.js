// 라이브러리
const dotenv = require('dotenv');
const Koa = require('koa');
const Router = require('koa-router');
const bodyParser = require('koa-bodyparser');
const mongoose = require('mongoose');
const cors = require('@koa/cors');
const authMiddleware = require('./middleware/authMiddleware');

// 환경변수 설정
dotenv.config({ path : '../.env'});
const { PORT, MONGO_URI } = process.env;
const port = PORT || 4000;

// 서브 라우터
const api = require('./api');

// 데이터베이스 연동
mongoose
  .connect(MONGO_URI, { useNewUrlParser: true })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((e) => {
    console.error(e);
  });


// 인스턴스
const app = new Koa();
const router = new Router();

// 라우터 적용
router.use('/api', api.routes());

app.use(cors({
  origin : 'http://localhost:3000',
  credentials : true
}));

app.use(bodyParser());
app.use(authMiddleware);
app.use(router.routes()).use(router.allowedMethods()); // app 인스턴스에 라우터 적용

app.listen(port, () => {
  console.log('Listening to port %d', port);
});
