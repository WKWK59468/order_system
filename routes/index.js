const express = require("express")
const router = express.Router()

const user = require("./user.route")
const group = require("./group.route")
const login = require("./login.route")
const store = require("./store.route")
const meals = require("./meals.route")

router.use("/login", login)
router.use("/user", user)
router.use("/group", group)
router.use("/store", store)
router.use("/meals", meals)

module.exports = router
