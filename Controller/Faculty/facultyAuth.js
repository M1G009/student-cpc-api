let Faculty = require('../../Model/Faculty')
var jwt = require('jsonwebtoken');
let bcrypt = require('bcrypt')

exports.Login = async function (req, res, next) {
    try {
        // console.log("error");
        let data = { ...req.body }
        if (!data.email || !data.password) {
            throw new Error("Please enter valid fields")
        }
        let details = await Faculty.findOne({ email: data.email })
        if (!details) {
            throw new Error("User not found")
        }

        // throw new Error("Password not match")
        var token = jwt.sign({ _id: details._id }, process.env.FACULTY_TOKEN_KEY)
        return res.status(200).json({
            message: 'login successful',
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}


exports.protect = async function (req, res, next) {
    try {
        let token = req.headers.auth;
        if (token) {
            let verified = jwt.verify(token, process.env.FACULTY_TOKEN_KEY)
            if (verified) {
                req.headers.id = verified._id
                next()
            }
            else {
                throw new Error("Token is Not Valid")
            }
        }
        else {
            throw new Error("Token not Found")
        }
    } catch (error) {
        console.log(error);
        return res.status(404).json({
            message: error.message
        })
    }
}