const express = require("express")
const app = express()
const PORT = 3000
const fs = require("fs")

app.set("view engine", "ejs")
app.use(express.urlencoded({extended: false}))

// ROUTES
// GET localhost:3000/dinosaurs
app.get("/dinosaurs", function(req, res) {
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render("dinosaurs/index", {myDinos: dinoData})
})

// GET localhost:3000/dinosaurs/new
app.get("/dinosaurs/new", function(req,res) {
    res.render("dinosaurs/new")
})

// POST localhost:3000/dinosaurs
app.post("/dinosaurs", function(req, res){
    // console.log("NAME:", req.body.name
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)
    console.log(dinoData)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
})

// GET localhost:3000/dinosaurs/:index 
app.get("/dinosaurs/:idx", function(req,res){
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    const dinoIndex = parseInt(req.params.idx)
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})

app.listen(PORT, function(){
    console.log("Server listening on port " + PORT)
})