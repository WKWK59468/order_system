const userModels = require("../models/user.model");
const myPackage = require("../function_package");

class UserController {
  addUser = (req, res) => {
    const body = req.body;
    const name = body.name;
    const nickname = body.nickname;
    const email = body.email;
    const password = body.password;

    const data = {
      name: name,
      nickname: nickname,
      email: email,
      password: password,
    };

    userModels
      .addUser(data)
      .then((result) => {
        res.status(201).json(myPackage.res_type(201, "OK", body));
      })
      .catch((err) => {
        err === "此email已經被註冊了!"
          ? res.status(400).json(myPackage.res_type(400, err, null))
          : res.status(500).json(myPackage.res_type(500, "ServerError", err));
      });
  };
  fetchAll = (req, res) => {
    userModels
      .fetchAll()
      .then((result) => {
        res.status(200).json(myPackage.res_type(200, "OK", result));
      })
      .catch((err) => {
        err === "NoData"
          ? res.status(404).json(myPackage.res_type(404, err, null))
          : res.status(500).json(myPackage.res_type(500, "ServerError", err));
      });
  };
  fetchOne = (req, res) => {
    const email = req.params.email;
    userModels
      .fetchOne(email)
      .then((result) => {
        res.status(200).json(myPackage.res_type(200, "OK", result));
      })
      .catch((err) => {
        err === "NoData"
          ? res.status(404).json(myPackage.res_type(404, err, null))
          : res.status(500).json(myPackage.res_type(500, "ServerError", err));
      });
  };
  insertData = (req, res) => {
    const email = req.params.email;
    const body = req.body;

    userModels.insertData(email,body)
      .then((result) => {
        res.status(200).json(myPackage.res_type(200, "OK", result))
      })
      .catch((err) => {
        res.status(500).json(myPackage.res_type(500, "ServerError", err))
      });
  }
  patchUser = (req, res) => {
    const body = req.body;
    const email = req.params.email;

    userModels
      .patchUser(email, body)
      .then((result) => {
        res.status(200).json(myPackage.res_type(200, "OK", result));
      })
      .catch((err) => {
        res.status(500).json(myPackage.res_type(500, "ServerError", err));
      });
  };
  delUser = (req, res) => {
    const params = req.params;
    const email = params.email;
    const data = {
      email: email,
    };
    userModels
      .deleteUser(data)
      .then((result) => {
        res.status(200).json(myPackage.res_type(200, "OK", result));
      })
      .catch((err) => {
        err === "查無此Email"
          ? res.status(400).json(myPackage.res_type(400, err, null))
          : res.status(500).json(myPackage.res_type(500, "ServerError", err));
      });
  };
}

module.exports = new UserController();
