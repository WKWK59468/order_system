const express = require("express")
const router = express.Router()
const MealsController = require("../controllers/meals.controller")

router.post("/", MealsController.add)
router.get("/", MealsController.fetchAll)
router.get("/:id", MealsController.fetchOneById)
router.delete("/:id", MealsController.deleteOneById)
router.patch("/:id", MealsController.updateOneById)

module.exports = router