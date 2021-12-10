const express = require("express");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const index = require("./routes/index.js")
const mongoose = require('mongoose');

const app = express();
const dbURL = 'mongodb+srv://Jrong:wkwk59468@whatforlunch.3wqy9.mongodb.net/what_for_lunch?retryWrites=true&w=majority'

mongoose.connect(dbURL, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    })
    .then((result)=>{
        console.log('connected to db.');
    })
    .catch((err)=>{
        console.log(err)
    });

app.use(cors());
app.use(logger("dev"));
app.use(express.urlencoded({
    extended: false
}));
app.use(express.json());
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "view")));

// Router
app.use("/api", index);

const server = http.createServer(app);

server.listen(4000);

server.on('listening', () => {
    const addr = server.address();
    console.log(`Server is on ${addr.port}`);
})