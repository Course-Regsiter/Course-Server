exports.isLoggedIn = (ctx, next) => {
  if (!ctx.state.user) {
    ctx.status = 401;
    return;
  }
  return next();
};

exports.isLoggedOut = (ctx, next) => {
  if (ctx.state.user) {
    ctx.status = 403;
    return;
  }
  return next();
};
