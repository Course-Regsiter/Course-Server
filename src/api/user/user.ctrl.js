const User = require('../../models/user');
const Course = require('../../models/course');

exports.list = async (ctx) => {
  const { _id } = ctx.state.user;

  try {
    const user = await User.findById(_id);
    ctx.body = user.courseList;
  } catch (e) {
    e.throw(500, e);
  }
};

exports.register = async (ctx) => {
  let check = false;
  const { course_id } = ctx.request.body;
  const { _id } = ctx.state.user;

  try {
    const course = await Course.findByCourseid(course_id);

    if (!course) {
      ctx.status = 404;
      return;
    }

    const user = await User.findById(_id);

    await user.courseList.forEach((el) => {
      if (el.courseNum === course_id) {
        check = true;
        return;
      }
    });

    if (check) {
      ctx.status = 409;
      return;
    }

    const newList = [...user.courseList].concat(course);

    user.courseList = newList;

    await user.save();
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.remove = async (ctx) => {
  const { cid } = ctx.params;
  const { _id } = ctx.state.user;

  try {
    const course = await Course.findByCourseid(cid);

    if (!course) {
      ctx.status = 404;
      return;
    }

    const user = await User.findById(_id);

    const newList = user.courseList.filter((el) => el.courseNum !== cid);

    user.courseList = newList;
    await user.save();
    ctx.body = user.serialize();
  } catch (e) {
    ctx.throw(500, e);
  }
};
