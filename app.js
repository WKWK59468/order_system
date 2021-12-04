const express = require("express");
const http = require("http");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const index = require("./routes/index.js")

const app = express();

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