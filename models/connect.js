const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

// Connection URL
// const dbURL = 'mongodb+srv://Jrong:wkwk59468@whatforlunch.3wqy9.mongodb.net/what_for_lunch?retryWrites=true&w=majority'
const dbURL = 'mongodb://weirdooo.nutc.edu.tw:63426/what_for_lunch'

module.exports = {
    connectDB: () => {
        mongoose.connect(dbURL, {
                useNewUrlParser: true,
                useUnifiedTopology: true
            })
            .then((result) => {
                console.log('connected to db.');
            })
            .catch((err) => {
                console.log(err)
            });
    }
}