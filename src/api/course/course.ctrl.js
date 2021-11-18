const Course = require('../../models/course');

exports.write = async (ctx) => {
  const { no, name, prof, room } = ctx.request.body;

  const course = new Course({
    no,
    name,
    prof,
    room,
  });
  try {
    await course.save();
    ctx.body = course;
  } catch (e) {
    ctx.throw(500, e);
  }
};

// 전체 과목리스트
exports.list = async (ctx) => {
  try {
    const courses = await Course.find().exec();
    ctx.body = courses;
  } catch (e) {
    ctx.throw(500, e);
  }
};
