const mongoose = require('mongoose');

const { Schema } = mongoose;

const CourseSchema = new Schema({
  no: String,
  name: String,
  prof: String,
  room: String,
});

CourseSchema.statics.findByNo = function (no) {
  return this.findOne({ no });
};

const Course = mongoose.model('Course', CourseSchema);
module.exports = Course;
