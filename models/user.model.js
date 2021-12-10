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

const User = mongoose.model('user', userSchema,'user');
//Mongoose#model(name, [schema], [collection], [skipInit])

const userCollection = {

    addUser: (data) => {
        return new Promise((resolve, reject) => {
            const userData = new User({
                name: data.name,
                nickname: data.nickname,
                email: data.email,
                password: data.password
            });
            userData.save()
            .then((result)=>{
                resolve(result);
            })
            .catch((err)=>{
                reject(err);
            })
        })
    }

}

module.exports = userCollection;