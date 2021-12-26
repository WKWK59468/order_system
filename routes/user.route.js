const express = require("express")
const router = express.Router()
const UserController = require("../controllers/user.controller")

router.post("/", UserController.addUser)
router.get("/", UserController.fetchAll)
router.get("/:email", UserController.fetchOne)
router.patch("/:email", UserController.patchUser)
router.delete("/:email", UserController.deleteUser)

module.exports = router
