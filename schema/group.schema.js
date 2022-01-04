const mongoose = require("mongoose")
const Schema = mongoose.Schema

const groupSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    organizer: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

groupSchema.set("collection", "group")

const Group = mongoose.model("group", groupSchema)

module.exports = Group
