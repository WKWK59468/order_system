const mongoose = require("mongoose")
const Schema = mongoose.Schema

const mealsSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

mealsSchema.set("collection", "meals")

const Meals = mongoose.model("meals", mealsSchema)

module.exports = Meals
