const Student = require('../../Model/Student');

exports.studentWorkUpdate = async function (req, res, next) {
    try {
        // console.log('multer pass');
        let data = { ...req.body }
        let id = req.headers.id
        // console.log(req.files);
        if (!id || !data) {
            throw new Error('Id Or Data Were Not Found')
        }
        // console.log(req.files);
        data.ele = JSON.parse(data.ele)
        data.subCourse = JSON.parse(data.subCourse)
        data.ele.student = true
        // data.ele.uploadDate = new Date();
        let today = new Date()
        var dd = String(today.getDate()).padStart(2, '0');
        var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
        var yyyy = today.getFullYear();
        today = yyyy + '/' + mm + '/' + dd;
        data.ele.uploadDate = today
        data.ele.workImages = req.files.workImages.map((e) => {
            return e.filename
        })
        // console.log(data);
        // await Student.find({ 'subcourse': data.subCourse })
        await Student.findByIdAndUpdate(id, { $set: { "topic.$[a].topics.$[b]": data.ele } }, { "arrayFilters": [{ 'a._id': data.subCourse._id }, { 'b._id': data.ele._id }] })
        let details = await Student.findById(id)
        return res.status(200).json({
            details
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.remarkSubmit = async function (req, res, next) {
    try {
        let data = { ...req.body }
        console.log(req.body);
        let id = req.headers.id
        if (!id || !data) {
            throw new Error('Id Or Data Were Not Found')
        }
        else {
            console.log(data);
            await Student.findByIdAndUpdate(id, { $set: { "topic.$[c].topics.$[d].remark": data.value } }, { "arrayFilters": [{ 'c._id': data.subCourse._id }, { 'd._id': data.ele._id }] })
            return res.status(200).json({
                message: 'update successful'
            })
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}

exports.student = async function (req, res, next) {
    try {
        let id = req.headers.id
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