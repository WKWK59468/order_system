const express = require("express")
const router = express.Router()

const user = require("./user.route")
const group = require("./group.route")
const login = require("./login.route")
const store = require("./store.route")

router.use("/login", login)
router.use("/user", user)
router.use("/group", group)
router.use("/store", store)

module.exports = router
