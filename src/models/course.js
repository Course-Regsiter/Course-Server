const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  courseNum: String,
  courseName: String,
  prof: String,
  room: String,
});

CourseSchema.statics.findByCourseid = function (course_id) {
  return this.findOne({ courseNum: course_id });
};

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
