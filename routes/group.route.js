const express = require("express")
const router = express.Router()
const GroupController = require("../controllers/group.controller")

router.post("/", GroupController.addGroup)
router.get("/", GroupController.fetchAll)
router.get("/organzier/:organzier", GroupController.fetchOne)
router.get("/name/:name", GroupController.fetchOne)
router.patch("/:groupName", GroupController.patchGroup)
router.delete("/:groupName", GroupController.deleteGroup)

module.exports = router