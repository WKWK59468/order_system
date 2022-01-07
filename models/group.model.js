const Group = require("../schema/group.schema")

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
      Group.find({})
        .populate("users")
        .exec((err, res) => {
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
  addUsers: (groupID, data) => {
    return new Promise((resolve, reject) => {
      Group.find({ _id: groupID }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          // 加入群組
          data.users.forEach((element) => {
            res[0].users.push(element)
          })
          // 移除重複
          const filteredArray = res[0].users.filter(
            (element, position) => res[0].users.indexOf(element) === position
          )
          Group.findOneAndUpdate(
            { _id: groupID },
            { users: filteredArray },
            (error, result) => {
              if (error) {
                reject(error)
              } else {
                resolve(result)
              }
            }
          )
        }
      })
    })
  },
  deleteUsers: (groupID, data) => {
    return new Promise((resolve, reject) => {
      Group.find({ _id: groupID }, (err, res) => {
        if (err) {
          reject(err)
        } else {
          const users = res[0].users
          const array = users
            .concat(data.users)
            .filter((element, index, array) => {
              return array.indexOf(index) !== array.lastIndexOf(index)
            })

          console.log(array)
          // Group.findOneAndUpdate(
          //   { _id: groupID },
          //   { users: array },
          //   (error, result) => {
          //     if (error) {
          //       reject(error)
          //     } else {
          //       resolve(result)
          //     }
          //   }
          // )
        }
      })
    })
  },
}

module.exports = groupCollection
