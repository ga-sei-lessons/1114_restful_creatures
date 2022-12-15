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

// DELETE localhost:3000/dinosaurs/:id
router.delete('/:idx', (req, res) => {
    // read and parse our dino data
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // remove the dinosaur indicated by the req.params from the dino array
    const dinoIndex = Number(req.params.idx)
    // console.log(dinoIndex)
    // array.splice(starting index to remove, how many indexes to remove)
    dinoData.splice(dinoIndex, 1) // only remove on item starting req.params.idx

    // save the dino data
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to /dinosaurs to show the user that the dino has been deleted
    res.redirect('/dinosaurs')
})

// PUT /dinosaurs/:idx -- Edit dino at idx
router.put('/:idx', (req, res) => {
    // read the dino data and parse the json
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // update the dino indicated by the req.params with the data from the req.body
    dinoData[req.params.idx].name = req.body.name
    dinoData[req.params.idx].type = req.body.type

    // write the dino file
    fs.writeFileSync('./dinosaurs.json', JSON.stringify(dinoData))

    // redirect to where the client can find update data (either /dinosaurs or /dinosaurs/:idx)
    res.redirect(`/dinosaurs/${req.params.idx}`)
})

// GET /dinosaurs/:idx/edit -- show a form to edit a dion
router.get('/:idx/edit', (req, res) => {
    // look up the dino to edit from the req.params.idx
    const dinosaurs = fs.readFileSync('./dinosaurs.json')
    const dinoData = JSON.parse(dinosaurs)

    // render a form to edit this dino
    res.render('dinosaurs/edit.ejs', {
        dino: dinoData[req.params.idx],
        dinoId: req.params.idx
    })
})

module.exports = router