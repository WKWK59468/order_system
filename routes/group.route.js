const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");

router.get("/:G_name", GroupController);
router.post("/", GroupController);
router.patch("/:G_name", GroupController);
router.delete("/:G_name", GroupController);

module.exports = router;