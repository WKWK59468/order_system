const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      default: "user",
      required: true,
    },
    group: {
      type: String,
    },
    google_ID: {
      type: String,
    },
    line_ID: {
      type: String,
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

      const userData = new User(data);

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
        err ? reject(err) : res ? resolve(res) : reject("查無此Email");
      });
    });
  },
  patchUser: (email, data) => {
    return new Promise((resolve, reject) => {
      User.updateOne({ email: email }, data, (err, res) => {
        err
          ? reject(err)
          : res.matchedCount === 0
          ? reject("查無此Email")
          : resolve(res);
      });
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
