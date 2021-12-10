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
            "name": name,
            "nickname": nickname,
            "email": email,
            "password": password,
        }

        userModels.addUser(data)
            .then((result) => {
                res.status(myPackage.statusCode.created).json(myPackage.res_type(myPackage.statusCode.created, "OK", result));
            })
            .catch((err) => {
                res.status(myPackage.statusCode.ServerError).json(myPackage.res_type(myPackage.statusCode.ServerError, "ServerError", err));
            });
    }
    fetchUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", {}));
    }
    putUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", {}));
    }
    patchUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", {}));
    }
    delUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", {}));
    }
}

module.exports = new UserController();