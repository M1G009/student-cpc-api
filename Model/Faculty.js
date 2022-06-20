const { status } = require('express/lib/response');
let mongoose = require('mongoose')
let schemaPlugin = require('./plugin/schemaPlugin')
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const facultySchema = new Schema({
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
  mobile: {
      type: Number,
      required: [true, 'mobile no. is compulsory'],
      unique: [true, 'the same mobile no. already exists']
  },
  profile: {
    type: String
  },
  status: Number,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: Date.now(),
  },
});

facultySchema.set("toObject", { virtuals: true });
facultySchema.set("toJSON", { virtuals: true });

facultySchema.pre('save', function(next) {
  this.UpdatedAt = Date.now();
  return next();
});

facultySchema.plugin(schemaPlugin)

const Faculty = mongoose.model('Faculty', facultySchema);
module.exports = Faculty;