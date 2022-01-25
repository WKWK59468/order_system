const express = require("express")
const http = require("http")
const cookieParser = require("cookie-parser")
const logger = require("morgan")
const cors = require("cors")
const index = require("./routes/index.js")
const DB = require("./connect")

const app = express()

DB.connectDB()

app.use(cors())
app.use(logger("dev"))
app.use(
  express.urlencoded({
    extended: false,
  })
)
app.use(express.json())
app.use(cookieParser())

// Router
app.use("/api", index)

const server = http.createServer(app)

server.listen(process.env.PORT || 4000)

server.on("listening", () => {
  const addr = server.address()
  console.log(`Server is on ${addr.port}`)
})
