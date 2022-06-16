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
  status: Number
});



const Courses = mongoose.model('Courses', CoursesSchema);

module.exports = Courses;