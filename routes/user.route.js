const express = require("express");
const router = express.Router()
const UserController = require("../controllers/user.controller");

router.post("/add",UserController.addUser);

module.exports = router;