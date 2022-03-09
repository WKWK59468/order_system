require("dotenv").config()
const userModels = require("../models/user.model")
const fun = require("../function_package")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")
const SECRET = process.env.SECRET

function origin(res, email, password) {
  userModels
    .fetchOne(email)
    .then((result) => {
      bcrypt
        .compare(password, result.password)
        .then((check) => {
          if (check) {
            let jwt_token = jwt.sign({ email: email, _id: result._id, name: result.name, role: result.role }, SECRET, { expiresIn: "1 day" })
            res.status(200).json(fun.res_type(200, "OK", jwt_token))
          } else {
            res.status(400).json(fun.res_type(400, "PasswordError", null))
          }
        })
        .catch((err) => {
          res.status(400).json(fun.res_type(400, "LoginError", null))
        })
    })
    .catch((err) => {
      if (err === "查無此Email") {
        res.status(400).json(fun.res_type(400, "EmailError", null))
      } else {
        res.status(500).json(fun.res_type(500, "ServerError", err))
      }
    })
}
// 暫緩
function google(res, email, googleUsername, googleUserID) {
  userModels
    .fetchOne(email)
    .then((result) => {
      bcrypt
        .compare(googleUserID, result.googleUserID)
        .then((check) => {

        })
        .catch((err) => {

        })
    })
    .catch((err) => {
      if (err === "查無此Email") {

        const data = {
          name: googleUsername,
          googleUserID: googleUserID,
          email: email,
        }

        userModels.addUser(data)

      } else {
        res.status(500).json(fun.res_type(500, "ServerError", err))
      }
    })
}
// 暫緩
function line(res, lineUsername, lineUserID) {
  userModels
    .fetchOne(email)
    .then((result) => {
      bcrypt
        .compare(googleUserID, result.googleUserID)
        .then((check) => {

        })
        .catch((err) => {

        })
    })
    .catch((err) => {
      if (err === "查無此Email") {

        const data = {
          name: lineUsername,
          googleUserID: lineUserID,
        }

        userModels.addUser(data)

      } else {
        res.status(500).json(fun.res_type(500, "ServerError", err))
      }
    })
}

class LoginController {
  login = (req, res) => {
    const body = req.body

    if (body.loginType === "original") {
      const email = body.email
      const password = body.password

      origin(res, email, password)
      
    // 暫緩
    // } else if (body.loginType === "line") {
    //   const email = body.email
    //   const lineUsername = body.lineUsername
    //   const lineUserID = body.lineUserID

    //   line(res, email, lineUsername, lineUserID)

    // } else if (body.loginType === "google") {
    //   const email = body.email
    //   const googleUsername = body.googleUsername
    //   const googleUserID = body.googleUserID

    //   google(res, email, googleUsername, googleUserID)

    } else {
      res.status(400).json(fun.res_type(400, "loginType Error", null))
    }
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
