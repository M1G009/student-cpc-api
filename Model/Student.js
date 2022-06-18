const { status } = require('express/lib/response');
let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schemaPlugin = require('./plugin/schemaPlugin')
// const ObjectId = Schema.ObjectId;

const topicSchema = new Schema({
    name: String,
    remark: String,
    student: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    faculty: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    uploadDate: Date,
    workImages: [{
        type: String,
        validate: [arrayLimit, "max 10 image upload"]
    }],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    UpdatedAt: {
        type: Date,
        default: Date.now(),
    }
})

topicSchema.pre('save', function(next) {
    this.UpdatedAt = Date.now();
    return next();
});



function arrayLimit(value) {
    return value.length <= 10
}

topicSchema.plugin(schemaPlugin)

const subCourseSchema = new Schema({
    subcourse: String,
    topics: [topicSchema],
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    UpdatedAt: {
        type: Date,
        default: Date.now(),
    },
})


subCourseSchema.pre('save', function(next) {
    this.UpdatedAt = Date.now();
    return next();
});


const studentSchema = new Schema({
    fname: {
        type: String,
        required: [true, 'name is compulsory to be entered']
    },
    lname: {
        type: String,
        required: [true, 'name is compulsory to be entered']
    },
    fatherName: {
        type: String,
        required: [true, 'name is compulsory to be entered']
    },
    joiningDate: {
        type: Date,
        required: [true, "Joining Date not Entered"]
    },
    mobile: {
        type: Number,
        maxlength: 12,
        minlength: 10
    },
    workingHours: String,
    courseName: {
        type: Schema.Types.ObjectId,
        ref: 'Courses'
    },
    subcourse: [{
        type: Schema.Types.ObjectId,
        ref: 'SubCourse'
    }],
    faculty: {
        type: Schema.Types.ObjectId,
        ref: 'Faculty'
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
    topic: [subCourseSchema],
    address: String,
    status: Number,
    city: String,
    state: String,
    zip: Number,
    profile: String,
    createdAt: {
        type: Date,
        default: Date.now(),
    },
    UpdatedAt: {
        type: Date,
        default: Date.now(),
    },
});

studentSchema.pre('save', function(next) {
    this.UpdatedAt = Date.now();
    return next();
});

studentSchema.set("toObject", { virtuals: true });
studentSchema.set("toJSON", { virtuals: true });



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;