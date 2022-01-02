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

const groupCollection = {
  addGroup: (data) => {
    const groupData = new Group(data)
    return new Promise((resolve, reject) => {
      groupData
        .save()
        .then((result) => {
          resolve(result)
        })
        .catch((err) => {
          reject(err)
        })
    })
  },
  fetchAll: () => {
    return new Promise((resolve, reject) => {
      Group.find({}, (err, res) => {
        if (err) {
          reject(err)
        } else if (res.length) {
          resolve(res)
        } else {
          reject("NoData")
        }
      })
    })
  },
  fetchOne: (data) => {
    return new Promise((resolve, reject) => {
      Group.findOne(data, (err, res) => {
        if (err) {
          reject(err)
        } else if (res) {
          resolve(res)
        } else {
          reject("NoData")
        }
      })
    })
  },
  patchGroup: (name, data) => {
    return new Promise((resolve, reject) => {
      Group.updateOne(
        {
          name: name,
        },
        data,
        (err, res) => {
          if (err) {
            reject(err)
          } else if (res.matchedCount === 0) {
            reject("查無此團體")
          } else {
            resolve(res)
          }
        }
      )
    })
  },
  deleteGroup: (data) => {
    return new Promise((resolve, reject) => {
      Group.deleteOne(data, (err, res) => {
        if (err) {
          reject(err)
        } else if (res.deletedCount === 0) {
          reject("查無此團體")
        } else {
          resolve(res)
        }
      })
    })
  },
}

module.exports = groupCollection
