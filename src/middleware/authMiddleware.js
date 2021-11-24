const jwt = require('jsonwebtoken');

const authMiddleware = async (ctx, next) => {
  //const token = ctx.cookies.get('access_token');
  const token = ctx.get('Authorization')?.split('Bearer ')[1];

  if (!token) return next(); // 토큰 없음

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    ctx.state.user = {
      _id: decoded._id,
      userid: decoded.userid,
    };
    return next();
  } catch (e) {
    return next();
  }
};

module.exports = authMiddleware;
