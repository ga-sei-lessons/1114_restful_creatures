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

// DELETE localhost:3000/creatures/:id
router.delete('/:idx', (req, res) => {
    // read and parse our creature data
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    // remove the creature indicated by the req.params from the creature array
    const creatureIndex = Number(req.params.idx)
    // console.log(creatureIndex)
    // array.splice(starting index to remove, how many indexes to remove)
    creatureData.splice(creatureIndex, 1) // only remove on item starting req.params.idx

    // save the creature data
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to /creatures to show the user that the creature has been deleted
    res.redirect('/creatures')
})

// PUT /creatures/:idx -- Edit creature at idx
router.put('/:idx', (req, res) => {
    // read the creature data and parse the json
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    // update the creature indicated by the req.params with the data from the req.body
    creatureData[req.params.idx].img_url = req.body.img_url
    creatureData[req.params.idx].type = req.body.type

    // write the creature file
    fs.writeFileSync('./prehistoric_creatures.json', JSON.stringify(creatureData))

    // redirect to where the client can find update data (either /creatures or /creatures/:idx)
    res.redirect(`/creatures/${req.params.idx}`)
})

// GET /creatures/:idx/edit -- show a form to edit a dion
router.get('/:idx/edit', (req, res) => {
    // look up the creature to edit from the req.params.idx
    const creatures = fs.readFileSync('./prehistoric_creatures.json')
    const creatureData = JSON.parse(creatures)

    // render a form to edit this creature
    res.render('creatures/edit.ejs', {
        creature: creatureData[req.params.idx],
        creatureId: req.params.idx
    })
})

module.exports = router