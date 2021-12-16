const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    nickname: {
      type: String,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
    versionKey: false,
  }
);

userSchema.set("collection", "user");

const User = mongoose.model("user", userSchema);

const userCollection = {
  addUser: (data) => {
    return new Promise((resolve, reject) => {
      const userData = new User({
        name: data.name,
        nickname: data.nickname, //選填
        email: data.email,
        password: data.password,
      });
      User.count(
        {
          email: data.email,
        },
        (err, res) => {
          err
            ? reject(err)
            : res > 0
              ? reject("此email已經被註冊了!")
              : userData
                .save()
                .then((result) => {
                  resolve(result);
                })
                .catch((err) => {
                  reject(err);
                });
        }
      );
    });
  },
  fetchAll: () => {
    return new Promise((resolve, reject) => {
      User.find({}, (err, res) => {
        err ? reject(err) : res.length < 0 ? reject("NoData") : resolve(res);
      });
    });
  },
  fetchOne: (email) => {
    return new Promise((resolve, reject) => {
      User.findOne({ email: email }, (err, res) => {
        err ? reject(err) : res ? resolve(res) : reject("NoData");
      });
    });
  },
  insertData: (email, data) => {
    return new Promise((resolve, reject) => {
      User.findOneAndUpdate({ name: email }, data).exec((err, res) => {
        err ? reject(err) : resolve(res)
      })
    })
  },
  patchUser: (email, data) => {
    return new Promise((resolve, reject) => {
      User.updateOne(
        {
          email: email,
        },
        data,
        (err, res) => {
          err ? reject(err) : resolve(res);
        }
      );
    });
  },
  deleteUser: (data) => {
    return new Promise((resolve, reject) => {
      User.deleteOne(
        {
          email: data.email,
        },
        (err, res) => {
          err
            ? reject(err)
            : res.deletedCount === 0
              ? reject("查無此Email")
              : resolve(res);
        }
      );
    });
  },
};

module.exports = userCollection;
