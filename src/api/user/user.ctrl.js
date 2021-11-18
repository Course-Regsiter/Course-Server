const User = require('../../models/user');
const Course = require('../../models/course');

exports.reserved = async (ctx) => {
  try {
    const user = await User.findById(ctx.state.user._id);
    ctx.body = user.reserved;
  } catch (e) {
    e.throw(500, e);
  }
};

exports.confirmed = async (ctx) => {
  try {
    const user = await User.findById(ctx.state.user._id);
    ctx.body = user.confirmed;
  } catch (e) {
    e.throw(500, e);
  }
};

exports.add = async (ctx) => {
  let check = false;
  const { no } = ctx.request.body;

  try {
    const course = await Course.findByNo(no);

    if (!course) {
      ctx.status = 404;
      return;
    }

    const user = await User.findById(ctx.state.user._id);

    if (!user) {
      ctx.status = 401;
      return;
    }

    await user.confirmed.forEach((el) => {
      if (el.no === no) {
        check = true;
        return;
      }
    });

    if (check) {
      ctx.status = 409;
      return;
    }

    const newConfirmed = [...user.confirmed].concat(course);

    user.confirmed = newConfirmed;

    await user.save();
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.remove = async (ctx) => {
  const { no } = ctx.request.body;

  try {
    const course = await Course.findByNo(no);

    if (!course) {
      ctx.status = 404;
      return;
    }

    const user = await User.findById(ctx.state.user._id);

    if (!user) {
      ctx.status = 401;
      return;
    }

    const newConfirmed = user.confirmed.filter((el) => el.no !== no);

    user.confirmed = newConfirmed;
    await user.save();
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
