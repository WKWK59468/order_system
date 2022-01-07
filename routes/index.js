const express = require("express")
const router = express.Router()

const user = require("./user.route")
const group = require("./group.route")
const login = require("./login.route")

router.use("/login", login)
router.use("/user", user)
router.use("/group", group)

module.exports = router
