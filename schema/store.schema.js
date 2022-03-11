const mongoose = require("mongoose")
const Schema = mongoose.Schema

const storeSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    openTime: {
        type:String,
    },
    closeTime: {
        type:String,
    },
    img: {
        type:String,
    },
    meals: [{
      type: Schema.Types.ObjectId,
      ref: "meals",
    }],
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

storeSchema.set("collection", "store")

const Store = mongoose.model("store", storeSchema)

module.exports = Store
