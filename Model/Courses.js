const { status } = require('express/lib/response');
let mongoose = require('mongoose');
const Schema = mongoose.Schema;
// const ObjectId = Schema.ObjectId;

const CoursesSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Name IS Required']
  },
  subcourses: [{ 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'SubCourse'
   }],
   duration: {
    type: String,
    required: [true, 'Courser duratio is compulsory to be entered']
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

CoursesSchema.set("toObject", { virtuals: true });
CoursesSchema.set("toJSON", { virtuals: true });

const Courses = mongoose.model('Courses', CoursesSchema);

module.exports = Courses;