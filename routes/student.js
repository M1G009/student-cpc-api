var express = require('express');
const multer  = require('multer')
var router = express.Router();
let studentController = require('../Controller/Student/studentController')
let studentAuth = require('../Controller/Student/studentAuthController')


const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public/images')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix + file.originalname)
    }
  })
  
  const upload = multer({ storage: storage })

router.post('/studentupdate', studentAuth.protect,upload.fields([{ name: 'workImages', maxCount: 10 }]), studentController.studentWorkUpdate)

router.post('/remark', studentAuth.protect, studentController.remarkSubmit)

router.get('/student', studentAuth.protect, studentController.student)

router.get('/allfaculty', studentAuth.protect, studentController.allFaculty)

router.post('/resetwork', studentAuth.protect, studentController.resetWork)

router.post('/login', studentAuth.Login)

module.exports = router;