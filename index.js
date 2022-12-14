const express = require("express")
const app = express()
const PORT = 3000
const fs = require("fs")

app.set("view engine", "ejs")

// ROUTES
// GET localhost:3000/dinosaurs
app.get("/dinosaurs", function(req, res) {
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    console.log(dinoData)
    res.render("dinosaurs/index", {myDinos: dinoData})
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