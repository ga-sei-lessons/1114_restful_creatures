const express = require("express")
const app = express()
const PORT = 3000
const fs = require("fs")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))

// CONTROLLERS
app.use("/dinosaurs", require("./controllers/dinosaurs.js"))
app.use("/creatures", require("./controllers/creatures.js"))

app.listen(PORT, function(){
    console.log("Server listening on port " + PORT)
})