const express = require("express")
const router = express.Router()
const fs = require("fs")

// base url localhost:3000/dinosaurs
// GET localhost:3000/dinosaurs
router.get("/", function(req, res) {
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    let dinoData = JSON.parse(dinosaurs)
    // console.log(dinoData)
    const nameFilter = req.query.nameFilter
    if(nameFilter) {
        dinoData = dinoData.filter(dino => dino.name.toLowerCase() === nameFilter.toLowerCase())
    }
    console.log("data", dinoData)
    res.render("dinosaurs/index", {myDinos: dinoData})
})

// GET localhost:3000/dinosaurs/new
router.get("/new", function(req,res) {
    res.render("dinosaurs/new")
})

// POST localhost:3000/dinosaurs
router.post("/", function(req, res){
    // console.log("NAME:", req.body.name
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    dinoData.push(req.body)
    console.log(dinoData)
    fs.writeFileSync("./dinosaurs.json", JSON.stringify(dinoData))
    res.redirect("/dinosaurs")
})

// GET localhost:3000/dinosaurs/:index 
router.get("/:idx", function(req,res){
    const dinosaurs = fs.readFileSync("./dinosaurs.json")
    const dinoData = JSON.parse(dinosaurs)
    const dinoIndex = parseInt(req.params.idx)
    res.render("dinosaurs/show", {myDino: dinoData[dinoIndex]})
})

module.exports = router