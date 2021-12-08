const userModels = require("../models/user.model");
const myPackage = require("../function_package");

class UserController {
    addUser = (req, res) => {
        res.status(200).json(myPackage.res_type(200, "", {}));
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