require("dotenv").config()
const userModels = require("../models/user.model")
const Package = require("../function_package")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SECRET = process.env.SECRET

class LoginController {
  login = (req, res) => {
    const body = req.body
    const email = body.email
    const password = body.password

    userModels
      .fetchOne(email)
      .then((result) => {
        bcrypt
          .compare(password, result.password)
          .then((check) => {
            if (check) {
              let jwt_token = jwt.sign({ email: email, _id: result._id, name: result.name, role: result.role }, SECRET, { expiresIn: "1 day" })
              res.status(200).json(Package.res_type(200, "OK", jwt_token))
            } else {
              console.log("PasswordError")
              res.status(400).json(Package.res_type(400, "PasswordError", null))
            }
          })
          .catch((err) => {
            console.log(err)
            res.status(400).json(Package.res_type(400, "PasswordError", null))
          })
      })
      .catch((err) => {
        if (err === "查無此Email") {
          res.status(400).json(Package.res_type(400, "EmailError", null))
        } else {
          res.status(500).json(Package.res_type(500, "ServerError", err))
        }
      })
  }
  check = (req, res, next) => {
    const token = req.header('Authorization')?.replace('Bearer ', '')
    jwt.verify(token, SECRET, (jwterr, decoded) => {
      if (jwterr) {
        res.status(401).json({ result: "not login", err: jwterr })
      } else {
        req.userData = { "decoded": decoded }
        next()
      }
    })
  }
}

module.exports = new LoginController()
