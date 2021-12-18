const express = require("express");
const router = express.Router();
const GroupController = require("../controllers/group.controller");

router.get("/", GroupController.fetchGroup);
// router.get("/:groupName", GroupController.fetchOne);
router.post("/", GroupController.addGroup);
// router.patch("/:groupName", GroupController);
// router.delete("/:groupName", GroupController);

module.exports = router;