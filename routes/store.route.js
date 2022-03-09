const express = require("express")
const router = express.Router()
const fun = require("../function_package")
const StoreController = require("../controllers/store.controller")

router.post("/", StoreController.addStore)
router.get("/:storeID", StoreController.fetchOneByID)
router.get("/", StoreController.fetchAllStore)
router.patch("/:storeID", StoreController.updateOneByID)
router.delete("/:storeID", StoreController.deleteOneByID)

module.exports = router
