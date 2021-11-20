const List = require('../../models/list');
const Course = require('../../models/course');

exports.list = async (ctx) => {
  const { userid } = ctx.state.user;

  try {
    const list = await List.findByUserid(userid);

    if (!list) {
      ctx.body = [];
    } else {
      ctx.body = list.courseList;
    }
  } catch (e) {
    e.throw(500, e);
  }
};

exports.reserve = async (ctx) => {
  const { userid } = ctx.state.user;

  try {
    const list = await List.findByUserid(userid);

    if (!list) {
      ctx.body = [];
    } else {
      ctx.body = list.preCourseList;
    }
  } catch (e) {
    e.throw(500, e);
  }
};

exports.register = async (ctx) => {
  let check = false;
  const { course_id } = ctx.request.body;
  const { userid } = ctx.state.user;

  try {
    const course = await Course.findByCourseid(course_id);

    if (!course) {
      ctx.status = 409;
      return;
    }

    const list = await List.findByUserid(userid);

    if (!list) {
      // console.log('없음');
      const newList = new List({
        id: userid,
      });
      newList.courseList = [course];
      newList.preCourseList = [];
      await newList.save();

      ctx.body = newList;
    } else {
      // console.log('있음');
      await list.courseList.forEach((el) => {
        if (el.courseNum === course_id) {
          check = true;
          return;
        }
      });

      if (check) {
        ctx.status = 409;
        return;
      }

      const newList = [...list.courseList].concat(course);

      list.courseList = newList;

      await list.save();
      ctx.body = list;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.select = async (ctx) => {
  let check = false;
  const { course_id } = ctx.request.body;
  const { userid } = ctx.state.user;

  try {
    const course = await Course.findByCourseid(course_id);

    if (!course) {
      ctx.status = 409;
      return;
    }

    const list = await List.findByUserid(userid);

    if (!list) {
      // console.log('없음');
      const newList = new List({
        id: userid,
      });
      newList.courseList = [];
      newList.preCourseList = [course];
      await newList.save();

      ctx.body = newList;
    } else {
      // console.log('있음');
      await list.preCourseList.forEach((el) => {
        if (el.courseNum === course_id) {
          check = true;
          return;
        }
      });

      if (check) {
        ctx.status = 409;
        return;
      }

      const newList = [...list.preCourseList].concat(course);

      list.preCourseList = newList;

      await list.save();
      ctx.body = list;
    }
  } catch (e) {
    ctx.throw(500, e);
  }
};

exports.remove = async (ctx) => {
  const { cid } = ctx.params;
  const { userid } = ctx.state.user;

  try {
    const course = await Course.findByCourseid(cid);

    if (!course) {
      ctx.status = 409;
      return;
    }

    const list = await List.findByUserid(userid);

    const newList = list.courseList.filter((el) => el.courseNum !== cid);

    list.courseList = newList;
    await list.save();
    ctx.body = list;
  } catch (e) {
    ctx.throw(500, e);
  }
};
