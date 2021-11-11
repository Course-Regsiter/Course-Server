const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const UserSchema = new Schema({
  id: String,
  password: String,
});

// 인스턴스 메서드
UserSchema.methods.setHashPassword = async function (password) {
  const hash = await bcrypt.hash(password, 10);
  this.password = hash;
};
UserSchema.methods.checkPassword = async function (password) {
  const result = await bcrypt.compare(password, this.password);
  return result;
};
UserSchema.methods.serialize = function () {
  const data = this.toJSON();
  delete data.password;
  return data;
};
UserSchema.methods.generateToken = function () {
  const token = jwt.sign(
    {
      _id: this._id,
      userid: this.id,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: '7d',
    },
  );
  return token;
};

// 스태틱 메서드
UserSchema.statics.findByUserid = function (id) {
  return this.findOne({ id });
};

const User = mongoose.model('User', UserSchema);
module.exports = User;
