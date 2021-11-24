const usermodels = require("../models/user.model");
const mypackage = require("../function_package");

class UserController{
    addUser = (req,res)=>{
        res.status(200).json(mypackage.res_type(200,"132"));
    }
}

module.exports = new UserController();