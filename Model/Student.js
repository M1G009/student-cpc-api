const { status } = require('express/lib/response');
let mongoose = require('mongoose')
const Schema = mongoose.Schema;
const schemaPlugin = require('./plugin/schemaPlugin')
// const ObjectId = Schema.ObjectId;

const topicSchema = new Schema({
    name: String,
    remark: String,
    faculty: {
        type: Boolean,
        enum: [true, false],
        default: false
    },
    uploadDate: Date,
    facultyCheckDate: Date,
    workImages: [{
        type: String,
        validate: [arrayLimit, "max 10 image upload"]
    }],
    createdAt: {
        type: { type: Date, default: Date.now() }
    },
    UpdatedAt: {
        type: { type: Date, default: Date.now() }
    }
})

topicSchema.pre('findByIdAndUpdate', function (next) {
    console.log("this.UpdatedAt", this);
    this.uploadDate = Date.now();
    next();
});


function arrayLimit(value) {
    return value.length <= 10
}


const subCourseSchema = new Schema({
    subcourse: String,
    topics: [topicSchema],
    createdAt: {
        type: Date,
    },
    UpdatedAt: {
        type: Date,
    },
})


subCourseSchema.pre('save', function (next) {
    now = new Date();
    this.UpdatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
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
    },
    UpdatedAt: {
        type: Date,
    },
    chats: [{
        message: String,
        from: String,
    }]
});

studentSchema.pre('save', function (next) {
    now = new Date();
    this.UpdatedAt = now;
    if (!this.createdAt) {
        this.createdAt = now;
    }
    next();
});

studentSchema.set("toObject", { virtuals: true });
studentSchema.set("toJSON", { virtuals: true });



const Student = mongoose.model('Student', studentSchema);
module.exports = Student;