const User = require('../../models/user');

exports.register = async (ctx) => {
  // 검증?

  const { id, password } = ctx.request.body;
  try {
    const exists = await User.findByUserid(id);
    if (exists) {
      ctx.status = 409; // 아이디 중복
      return;
    }

    const user = new User({
      id,
    });
    await user.setHashPassword(password);
    await user.save();

    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.login = async (ctx) => {
  const { id, password } = ctx.request.body;

  // 입력값 누락
  if (!id || !password) {
    ctx.status = 401;
    return;
  }

  try {
    const user = await User.findByUserid(id);

    // 존재하지 않는 아이디
    if (!user) {
      ctx.status = 401;
      return;
    }
    const valid = await user.checkPassword(password);
    // 잘못된 비밀번호
    if (!valid) {
      ctx.status = 401;
      return;
    }
    ctx.body = user.serialize();

    const token = user.generateToken();
    ctx.cookies.set('access_token', token, {
      maxAge: 1000 * 60 * 60 * 24 * 7, // 7일
      httpOnly: true,
    });
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 로그인 상태 확인
exports.check = async (ctx) => {
  const { user } = ctx.state;

  if (!user) {
    ctx.status = 401;
    return;
  }

  ctx.body = user;
};

exports.logout = async (ctx) => {
  ctx.cookies.set('access_token');
  ctx.status = 204;
};
