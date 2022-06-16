const { status } = require('express/lib/response');
let mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const adminSchema = new Schema({
  name: {
    type: String,
    required: [true, 'name is compulsory to be entered']
  },
  email: {
    type: String,
    required: [true, 'Email not found'],
    unique: [true, 'The same email already exists']
  },
  password: {
    type: String,
    required: [true, "password is compulsory to be entered"]
  },
  status: Number
});

const Admin = mongoose.model('Admin', adminSchema);
module.exports = Admin;