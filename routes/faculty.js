var express = require('express');
var router = express.Router();
let facultyController = require('../Controller/Faculty/facultyController')
let facultyAuth = require('../Controller/Faculty/facultyAuth')

router.get('/allstudents', facultyAuth.protect, facultyController.allStudent)
router.get('/faculty', facultyAuth.protect, facultyController.faculty)
router.get('/student', facultyAuth.protect, facultyController.student)
router.post('/work',facultyAuth.protect, facultyController.work)
router.post('/login', facultyAuth.Login)


module.exports = router;