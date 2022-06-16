var express = require('express');
const multer = require('multer')
var router = express.Router();
var adminController = require('../Controller/Admin/adminController')
var adminAuthController = require('../Controller/Admin/adminAuth')

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

/* GET users listing. */
router.post('/aalpha-cdmi-student-admin-add', adminController.addAdmin);
router.get('/removeadmin', adminAuthController.protect, adminController.removeAdmin);
router.post('/editadmin', adminAuthController.protect, adminController.editAdmin);
router.get('/alladmin', adminAuthController.protect, adminController.allAdmin);


router.post('/addfaculty', adminAuthController.protect, upload.single('faculty'), adminController.addFaculty);
router.get('/deletefaculty', adminAuthController.protect, adminController.removeFaculty);
router.get('/allfaculty', adminAuthController.protect, adminController.allFaculty);
router.get('/faculty', adminAuthController.protect, adminController.Faculty);

router.post('/courses/subcourses', adminAuthController.protect, adminController.addSubCourses)
router.get('/subcourses/allsubcourses', adminAuthController.protect, adminController.allSubCourses)
router.get('/subcourses/subcourse', adminAuthController.protect, adminController.SubCourse)
router.post('/subcourses/edit', adminAuthController.protect, adminController.editSubCourse)
router.get('/subcourses/delete', adminAuthController.protect, adminController.deleteSubCourse)


router.post('/addcourses', adminAuthController.protect, adminController.addCourses)
router.get('/allcourses', adminAuthController.protect, adminController.allCourses)
router.get('/course', adminAuthController.protect, adminController.Course)
router.get('/deletecourse', adminAuthController.protect, adminController.deleteCourse)

router.post('/addstudent', adminAuthController.protect, upload.single('profile'), adminController.addstudent)
router.get('/allstudents', adminAuthController.protect, adminController.allstudent)
router.get('/deletestudent', adminAuthController.protect, adminController.deleteStudent)
router.get('/student', adminAuthController.protect, adminController.student)

router.post('/login', adminAuthController.Login);

module.exports = router;