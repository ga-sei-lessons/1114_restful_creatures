const express = require("express")
const router = express.Router()
const fs = require("fs")

// full url localhost:3000/creatures

// GET /creatures
// INDEX ROUTE
router.get("/", function(req, res) {
    // res.send("CREATURES")
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creatureData = JSON.parse(creatures)
    // res.send(creatureData)
    res.render("creatures/index", {creatures: creatureData} )
})

// POST /creatures
// creating new creaute
router.post("/", function(req,res){
    const creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creaturesData = JSON.parse(creatures)
    console.log("\nREQ.BODY",req.body)
    creaturesData.push(req.body)
    fs.writeFileSync("./prehistoric_creatures.json", JSON.stringify(creaturesData))
    res.redirect("/creatures")
})

// GET /creatures/new
// new creature form
router.get("/new", function(req,res) {
    res.render("creatures/new")
})

// GET /creatures/:idx
// SHOW ROUTE
router.get("/:idx", function(req, res) {
    let creatures = fs.readFileSync("./prehistoric_creatures.json")
    const creatureData = JSON.parse(creatures)    
    const idx = parseInt(req.params.idx)
    // res.send(creatureData[idx])
    res.render("creatures/show", {creature: creatureData[idx]})
})

module.exports = router