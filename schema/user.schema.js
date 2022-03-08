const mongoose = require("mongoose")
const Schema = mongoose.Schema

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
    },
    password: {
      type: String,
    },
    role: {
      type: String,
      default: "user",
      enum: ["user", "admin"],
      required: true,
    },
    group: {
      type: String,
    },
    googleUserID: {
      type: String,
    },
    lineUserID: {
      type: String,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
)

userSchema.set("collection", "user")

const User = mongoose.model("user", userSchema)

module.exports = User
