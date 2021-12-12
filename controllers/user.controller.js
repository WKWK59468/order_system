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
                res.status(myPackage.statusCode.created).json(myPackage.res_type(myPackage.statusCode.created, "OK", body));
            })
            .catch((err) => {
                (err === '此email已經被註冊了!')
                    ? res.status(myPackage.statusCode.badRequest).json(myPackage.res_type(myPackage.statusCode.badRequest, "此email已經被註冊了", null))
                    : res.status(myPackage.statusCode.ServerError).json(myPackage.res_type(myPackage.statusCode.ServerError, "ServerError", err));
            });
    }
    fetchUser = (req, res) => {
        userModels.fetchUser()
            .then((result) => {
                res.status(myPackage.statusCode.ok).json(myPackage.res_type(myPackage.statusCode.ok, "OK", result));
            })
            .catch((err) => {
                (err === "none")
                    ? res.status(myPackage.statusCode.badRequest).json(myPackage.res_type(myPackage.statusCode.badRequest, "None", null))
                    : res.status(myPackage.statusCode.ServerError).json(myPackage.res_type(myPackage.statusCode.ServerError, "ServerError", err));
            });
    }
    putUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", null));
    }
    patchUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", null));
    }
    delUser = (req, res) => {
        const body = req.body;
        const email = body.email;
        const data = {
            email: email
        }
        userModels.deleteUser()
            .then((result) => {
                res.status(myPackage.statusCode.ok).json(myPackage.res_type(myPackage.statusCode.ok, "OK", result));
            })
            .catch((err) => {
                res.status(myPackage.statusCode.ServerError).json(myPackage.res_type(myPackage.statusCode.ServerError, "ServerError", err));
            });
    }
}

module.exports = new UserController();