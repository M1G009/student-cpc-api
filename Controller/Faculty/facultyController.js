let Admin = require('../../Model/Admin')
let Faculty = require('../../Model/Faculty')
const bcrypt = require('bcrypt');
const SubCourse = require('../../Model/SubCourses');
const Student = require('../../Model/Student');
const Courses = require('../../Model/Courses');

exports.allStudent = async function (req, res, next) {
    try {
        let id = req.headers.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            let facultyDetails = await Faculty.findById(id)
            if (!facultyDetails) {
                throw new Error('No Details Found On This Id')
            }
            else {
                let studentDetails = await Student.find({ 'faculty': facultyDetails._id }).populate('courseName')
                if (!studentDetails) {
                    throw new Error('No Students Are Registered For Your Course')
                }
                else {
                    return res.status(200).json({
                        studentDetails,
                        facultyDetails
                    })
                }
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.student = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            let details = await Student.findById(id).populate('subcourse')
            return res.status(200).json({
                details
            })
        }
    } catch (error) {
        console.log(error);
    }
}

exports.faculty = async function (req, res, next) {
    try {
        let id = req.headers.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            let details = await Faculty.findById(id)
            if (!details) {
                throw new Error("No Faculty Details Found")
            }
            else {
                return res.status(200).json({
                    details
                })
            }
        }
    } catch (error) {
        console.log(error);
    }
}

exports.work = async function (req, res, next) {
    try {
        let id = req.body.id
        let subCourseId = req.body.subCourseId
        let topicId = req.body.topicId;
        let checked = req.body.checked;

        if (!id || !subCourseId || !topicId) {
            throw new Error("Please check all id's")
        }

        let today = Date.now()
        // console.log(today);

        let details = await Student.findByIdAndUpdate(id, { $set: { 'topic.$[a].topics.$[b].faculty': checked ,  'topic.$[a].topics.$[b].facultyCheckDate':today } }, { "arrayFilters": [{ 'a._id': subCourseId }, { 'b._id': topicId }] })
        return res.status(200).json({
            message: 'update success',
            data: details
        })
    } catch (error) {
        console.log(error);
    }
}