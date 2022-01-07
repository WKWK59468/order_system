const express = require("express")
const router = express.Router()
const GroupController = require("../controllers/group.controller")

router.post("/", GroupController.addGroup)
router.post("/:groupID", GroupController.addUsers)
router.get("/", GroupController.fetchAll)
router.get("/organizer/:organizer", GroupController.fetchOne)
router.get("/name/:name", GroupController.fetchOne)
router.patch("/:groupName", GroupController.patchGroup)
router.delete("/:groupName", GroupController.deleteGroup)
router.delete("/deleteUsers/:groupID", GroupController.deleteUsers)

module.exports = router
