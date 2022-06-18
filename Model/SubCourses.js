const { status } = require('express/lib/response');
let mongoose = require('mongoose')
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const subcourseSchema = new Schema({
  subCourse: {
    type: String,
    required: [true, "Please Enter SubCourse name"]
  },
  topic: [{
    type: String,
    unique: [true, "Please enter unique topioc name"],
    required: [true, "Please enter topic name"]
  }],
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  UpdatedAt: {
    type: Date,
    default: Date.now(),
  },
});

subcourseSchema.set("toObject", { virtuals: true });
subcourseSchema.set("toJSON", { virtuals: true });

const SubCourse = mongoose.model('SubCourse', subcourseSchema);
module.exports = SubCourse;
