const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    nickname: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
}, {
    timestamps: true
})

userSchema.set('collection', 'user');

const User = mongoose.model('user', userSchema);

const userCollection = {

    addUser: (data) => {
        return new Promise((resolve, reject) => {
            const userData = new User({
                name: data.name,
                nickname: data.nickname,
                email: data.email,
                password: data.password
            });
            User.count({ email: data.email }, (err, res) => {
                err
                    ? reject(err)
                    : (
                        (res > 0)
                            ? reject('此email已經被註冊了!')
                            : userData.save()
                                .then((result) => {
                                    resolve(result);
                                })
                                .catch((err) => {
                                    reject(err);
                                })
                    )
            })

        })
    },
    fetchUser: () => {
        return new Promise((resolve, reject) => {
            User.find({}, (err, res) => {
                err
                    ? reject(err)
                    : ((res.length < 0)
                        ? reject("none")
                        : resolve(res)
                    );
            })
        })
    },
    putUser: (data) => {
        return new Promise((resolve, reject) => {

        })
    },
    patchUser: (data) => {
        return new Promise((resolve, reject) => {

        })
    },
    deleteUser: (data) => {
        return new Promise((resolve, reject) => {
            User.findOneAndDelete({ email: data.email }, (err, res) => {
                err
                    ? reject(err)
                    : resolve(res);
            })
        })
    }

}

module.exports = userCollection;