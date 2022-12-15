// import requireed packages
const express = require("express")
const methodOverride = require('method-override')

const app = express()
const PORT = 3000


app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))
// enable PUTing and DELETEing from HTML5 forms
app.use(methodOverride('_method'))

// CONTROLLERS
app.use("/dinosaurs", require("./controllers/dinosaurs.js"))
app.use("/creatures", require("./controllers/creatures.js"))

app.listen(PORT, function(){
    console.log("Server listening on port " + PORT)
})