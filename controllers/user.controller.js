const userModels = require("../models/user.model")
const fun = require("../function_package")
const bcrypt = require("bcrypt")

class UserController {
  addUser = async (req, res) => {
    const body = req.body
    const name = body.name
    const email = body.email
    const password = body.password
    const role = body.role
    const salt = await bcrypt.genSalt(10);
    const hashpwd = await bcrypt.hash(password, salt)

    const data = {
      name: name,
      email: email,
      password: hashpwd,
      role: role,
    }

    userModels
      .addUser(data)
      .then((result) => {
        res.status(201).json(fun.res_type(201, "OK", null))
      })
      .catch((err) => {
        if (err === "此email已經被註冊了!") {
          res.status(400).json(fun.res_type(400, err, null))
        } else {
          res.status(500).json(fun.res_type(500, "ServerError", err))
        }
      })
  }
  fetchAll = (req, res) => {
    userModels
      .fetchAll()
      .then((result) => {
        res.status(200).json(fun.res_type(200, "OK", result))
      })
      .catch((err) => {
        if (err === "NoData") {
          res.status(404).json(fun.res_type(404, err, null))
        } else {
          res.status(500).json(fun.res_type(500, "ServerError", err))
        }
      })
  }
  fetchOne = (req, res) => {
    const email = req.params.email

    userModels
      .fetchOne(email)
      .then((result) => {
        res.status(200).json(fun.res_type(200, "OK", result))
      })
      .catch((err) => {
        if (err === "查無此Email") {
          res.status(404).json(fun.res_type(404, err, null))
        } else {
          res.status(500).json(fun.res_type(500, "ServerError", err))
        }
      })
  }
  patchUser = (req, res) => {
    const body = req.body
    const email = req.params.email

    userModels
      .patchUser(email, body)
      .then((result) => {
        res.status(200).json(fun.res_type(200, "OK", null))
      })
      .catch((err) => {
        if (err === "查無此Email") {
          res.status(404).json(fun.res_type(404, err, null))
        } else {
          res.status(500).json(fun.res_type(500, "ServerError", err))
        }
      })
  }
  deleteUser = (req, res) => {
    const params = req.params
    const email = params.email
    const data = {
      email: email,
    }

    userModels
      .deleteUser(data)
      .then((result) => {
        res.status(200).json(fun.res_type(200, "OK", null))
      })
      .catch((err) => {
        if (err === "查無此Email") {
          res.status(404).json(fun.res_type(404, err, null))
        } else {
          res.status(500).json(fun.res_type(500, "ServerError", err))
        }
      })
  }
}

module.exports = new UserController()
