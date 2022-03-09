const { resetWatchers } = require("nodemon/lib/monitor/watch")
const User = require("../schema/user.schema")

const userCollection = {
  addUser: function (data) {
    return new Promise((resolve, reject) => {
      const userData = new User(data)

      User.count(
        {
          email: data.email,
        },
        (err, res) => {
          if (err) {
            reject(err)
          } else if (res > 0) {
            reject("此email已經被註冊了!")
          } else {
            userData
              .save()
              .then((result) => {
                resolve(result)
              })
              .catch((err) => {
                reject(err)
              })
          }
        }
      )
    })
  },
  fetchAll: function () {
    return new Promise((resolve, reject) => {
      User.find({}, (err, res) => {
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
  fetchOne: function (email) {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, res) => {
        if (err) {
          reject(err)
        } else if (res) {
          resolve(res)
        } else {
          reject("查無此Email")
        }
      })
    })
  },
  patchUser: function (email, data) {
    return new Promise((resolve, reject) => {
      User.updateOne(
        {
          email: email,
        },
        data,
        (err, res) => {
          if (err) {
            reject(err)
          } else if (res.matchedCount === 0) {
            reject("查無此Email")
          } else {
            resolve(res)
          }
        }
      )
    })
  },
  patchPassword: function (email, password) {
    return new Promise((resolve,reject)=>{
      User.updateOne(
        {
          email:email
        },
        {
          password:password
        },
        (err,res)=>{
          if(err){
            reject(err)
          }else if(res.matchedCount === 0){
            reject("查無此Email")
          } else {
            resolve(res)
          }
        }
      )
    })
  },
  deleteUser: function (data) {
    return new Promise((resolve, reject) => {
      User.deleteOne(
        {
          email: data.email,
        },
        (err, res) => {
          if (err) {
            reject(err)
          } else if (res.deletedCount === 0) {
            reject("查無此Email")
          } else {
            resolve(res)
          }
        }
      )
    })
  },
}

module.exports = userCollection
