const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    name: String,
    nickname: String,
    email: String,
    password: String
})

module.exports = mongoose.model('user', userSchema);