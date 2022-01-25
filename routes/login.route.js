const express = require("express")
const router = express.Router()
const fun = require("../function_package")
const LoginController = require("../controllers/login.controller")

router.post("/", LoginController.login)
router.post("/check", LoginController.check, function (req, res) {
    res.status(200).json(fun.res_type(200, "Login Success", null))
})

module.exports = router
