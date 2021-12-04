const express = require("express");
const router = express.Router()
const UserController = require("../controllers/user.controller");

router.post("/", UserController.addUser);
router.get("/", UserController.fetchUser);
router.put("/", UserController.putUser);
router.patch("/", UserController.patchUser);
router.delete("/", UserController.delUser);

module.exports = router;