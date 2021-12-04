const usermodels = require("../models/user.model");
const mypackage = require("../function_package");

class UserController {
    addUser = (req, res) => {
        res.status(200).json(mypackage.res_type(200, "add"));
    }
    fetchUser = (req, res) => {
        res.status(200).json(mypackage.res_type(200, "get"));
    }
    putUser = (req, res) => {
        res.status(200).json(mypackage.res_type(200, "put"));
    }
    patchUser = (req, res) => {
        res.status(200).json(mypackage.res_type(200, "patch"));
    }
    delUser = (req, res) => {
        res.status(200).json(mypackage.res_type(200, "del"));
    }
}

module.exports = new UserController();