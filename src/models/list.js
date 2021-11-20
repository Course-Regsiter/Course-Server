const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseNum: String,
  courseName: String,
  prof: String,
  room: String,
});

const ListSchema = new Schema({
  id: String,
  preCourseList: [CourseSchema],
  courseList: [CourseSchema],
});

// 인스턴스 메서드
ListSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;
  return data;
};

// 스태틱 메서드
ListSchema.statics.findByUserid = function (id) {
  return this.findOne({ id });
};

const List = mongoose.model('List', ListSchema);
module.exports = List;
