const express = require("express");
const router = express.Router();

const user = require("./user.route");
const group = require("./group.route");

router.use("/user", user);
router.use("/group", group);

module.exports = router;
