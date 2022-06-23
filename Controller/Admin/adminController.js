let Admin = require('../../Model/Admin')
let Faculty = require('../../Model/Faculty')
const bcrypt = require('bcrypt');
const SubCourse = require('../../Model/SubCourses');
const Courses = require('../../Model/Courses');
const Student = require('../../Model/Student');
// const { findByIdAndDelete } = require('../../Model/Admin');

exports.addAdmin = async function (req, res, next) {
    try {
        let data = { ...req.body }
        data.status = 1
        if (data) {
            data.password = await bcrypt.hash(data.password, 14)
            let details = await Admin.create(data);
            if (details) {
                return res.status(200).json({
                    message: 'data created successfuly',
                    details
                })
            }
        }
        else {
            throw new Error("no data found")
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.removeAdmin = async function (req, res, next) {
    try {
        let id = req.query.id
        if (id) {
            let deletedData = await Admin.findById(id)
            deletedData.status = 0
            await Admin.findByIdAndUpdate(id, deletedData)
            return res.status(200).json({
                error: 'delete data success',
                message: deletedData
            })
        }
        else {
            throw new Error('Data was not deleted')
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.editAdmin = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        console.log(data);
        if (id && data) {
            await Admin.findByIdAndUpdate(id, data)
            return res.status(200).json({
                error: 'edit data success'
            })
        }
        else {
            throw new Error('ID Or Data Was Not Found')
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allAdmin = async function (req, res, next) {
    try {
        let allAdmin = await Admin.find({ status: 1 })
        if (allAdmin) {
            return res.status(200).json({
                message: "data found",
                allAdmin
            })
        }
        else {
            throw new Error('No admins were Found')
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.addFaculty = async function (req, res, next) {
    try {
        let data = { ...req.body }
        // console.log(req.file);
        data.status = 1
        if (data && req.file) {
            // data.password = await bcrypt.hash(data.password, 8)
            data.profile = req.file.filename
            let details = await Faculty.create(data);
            if (!details) {
                throw new Error('Please check details')
            }
            return res.status(200).json({
                message: 'data created successfuly',
                details
                // data
            })
        }
        else {
            throw new Error("no data found")
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allFaculty = async function (req, res, next) {
    try {
        let allFaculty = await Faculty.find({ status: 1 })
        if (!allFaculty) {
            throw new Error('no faculties found')
        }
        else {
            return res.status(200).json({
                allFaculty
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.removeFaculty = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('Id was not found')
        }
        else {
            let details = await Faculty.findById(id);
            if (!details) {
                throw new Error('No details found on this id')
            }
            else {
                details.status = 0;
                await Faculty.findByIdAndUpdate(id, details)
                return res.status(200).json({
                    message: 'faculty deleted successfully'
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.editFaculty = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        if (!id || !data) {
            throw new Error('Id was not found')
        }
        else {
            await Faculty.findByIdAndUpdate(id, data)
            return res.status(200).json({
                message: 'Data Update Success'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.Faculty = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('ID was Not Found')
        }
        else {
            let details = await Faculty.findById(id)
            if (!details) {
                throw new Error('no details fopund on this id')
            }
            else {
                return res.status(200).json({
                    details
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.addSubCourses = async function (req, res, next) {
    try {
        let data = { ...req.body }
        // console.log(data);
        if (!data) {
            throw new Error('No Input Data Found')
        }
        else {

            let subCourses = await SubCourse.create(data)
            return res.status(200).json({
                subCourses,
                message: 'Course Added Successfuly'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(422).json({
            message: error.message
        })
    }
}

exports.allSubCourses = async function (req, res, next) {
    try {
        let details = await SubCourse.find()
        // if (!details) {
        //     throw new Error('No details found from backend')
        // }
        // else {
        return res.status(200).json({
            details,
            message: "data Found"
        })
        // }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.SubCourse = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            let details = await SubCourse.findById(id)
            if (!details) {
                throw new Error('No detrails Found On This Id')
            }
            else {
                return res.status(200).json({
                    details
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.editSubCourse = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        console.log(data);
        // console.log('edit ');
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            let details = await SubCourse.findById(id)
            if (!details) {
                throw new Error('No detrails Found On This Id')
            }
            else {
                await SubCourse.findByIdAndUpdate(id, data)
                return res.status(200).json({
                    message: 'Data Edited Successfuly'
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteSubCourse = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            await SubCourse.findByIdAndDelete(id)
            return res.status(200).json({
                message: 'record deleted Successfuly'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}




exports.addCourses = async function (req, res, next) {
    try {
        let data = { ...req.body }
        console.log(data);
        if (!data) {
            throw new Error('Input Values Not Found')
        }
        else {
            console.log(data);
            // let strinfgifiedData = JSON.stringify(data)

            let details = await Courses.create(data)
            return res.status(200).json({
                details
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allCourses = async function (req, res, next) {
    try {
        let details = await Courses.find().populate('subcourses')
        return res.status(200).json({
            details,
            message: 'data Found'
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.Course = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('ID Was Not Found')
        }
        else {
            let details = await Courses.findById(id).populate('subcourses')
            if (!details) {
                throw new Error('No Details Found On This ID')
            }
            else {
                return res.status(200).json({
                    details
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteCourse = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('ID Was Not Found')
        }
        else {
            let details = await Courses.findByIdAndDelete(id)
            return res.status(200).json({
                message: 'Delete Data Success',
                details
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.editCourse = async function (req, res, next) {
    try {
        console.log("hello");
        let id = req.query.id
        let data = { ...req.body }
        if (!id || !data) {
            throw new Error('ID Was Not Found')
        }
        else {
            let details = await Courses.findByIdAndUpdate(id, data)
            return res.status(200).json({
                message: 'Edit Data Success',
                details
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}




// -----------------------------STUDENT----------------------

exports.addstudent = async function (req, res, next) {
    try {
        let data = { ...req.body }
        // console.log(req.body);
        // console.log(data);
        // data.subcourse = JSON.parse(data.subcourse)
        console.log(data);

        if (!data) {
            throw new Error('Data was not found')
        }
        else {
            // let parsedData = JSON.parse(data)
            // console.log(parsedData);
            data.profile = req.file.filename

            // data.topic = 
            let subCourseDetails = await SubCourse.find({ _id: { "$in": data.subcourse } })
            // console.log(subCourseDetails);

            let newAllTopicArray = []
            subCourseDetails.map((e) => {
                let newTopicObj = { subcourse: e.subCourse }
                let newTopicsArray = []
                e.topic.map((ele, i) => {
                    return newTopicsArray.push({ name: ele, remark: '' })
                })
                newTopicObj['topics'] = newTopicsArray
                return newAllTopicArray.push(newTopicObj)
            })
            console.log(newAllTopicArray);
            // console.log(data.subcourse);
            // console.log(data);
            data.topic = [...newAllTopicArray]



            let details = await Student.create(data)
            return res.status(200).json({
                details,
                // newAllTopicArray,
                message: 'data Added Successfuly'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.allstudent = async function (req, res, next) {
    try {
        let details = await Student.find().populate('courseName faculty')
        if (!details) {
            throw new Error('Details not found')
        }
        else {
            return res.status(200).json({
                details
            })
        }

    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.deleteStudent = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('Id Was Not Found')
        }
        else {
            await Student.findByIdAndDelete(id)
            return res.status(200).json({
                message: 'delete successfull'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.editStudent = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = {...req.body}
        if (!id || !data) {
            throw new Error('Id Was Not Found')
        }
        //  console.log(req.files);   
        if(req.file){
            data.profile = req.file.filename
        }
        console.log(data);
            await Student.findByIdAndUpdate(id, {$set: data})
            return res.status(200).json({
                message: 'update successfull'
            })
        
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.student = async function (req, res, next) {
    try {
        let id = req.query.id
        if (!id) {
            throw new Error('ID Was Not Found')
        }
        else {
            let details = await Student.findById(id).populate('courseName').populate('subcourse').populate('faculty')
            if (!details) {
                throw new Error('No Details Found On This ID')
            }
            else {
                return res.status(200).json({
                    details
                })
            }
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.resetWork = async function (req, res, next) {
    try {
        let id = req.query.id
        let data = { ...req.body }
        if (!id) {
            throw new Error('ID Was Not Found')
        }
        else {
            data.ele = JSON.parse(data.ele)
            data.subCourse = JSON.parse(data.subCourse)
            await Student.findByIdAndUpdate(id, {
                $set: { "topic.$[a].topics.$[b].workImages": [] }
            }, {
                "arrayFilters": [{ 'a._id': data.subCourse._id }, { 'b._id': data.ele._id }]
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}