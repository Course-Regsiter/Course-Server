// user 데이터베이스 -> 리스트 한개로 축소
const mongoose = require('mongoose');
const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseNum: String,
  courseName: String,
  prof: String,
  room: String,
});

const UserSchema = new Schema({
  id: String,
  password: String,
  courseList: [CourseSchema],
});

// 인스턴스 메서드
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;
  return data;
};

// 스태틱 메서드
UserSchema.statics.findByUserid = function (id) {
  return this.findOne({ id });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
