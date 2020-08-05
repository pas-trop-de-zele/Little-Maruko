const router = require('express').Router();
const Tea = require("../models/teas.js");

// Landing page
router.get('/', (req, res) => {
    res.render("index");
})

// INDEX route: show all teas
router.get('/teas', (req, res) => {
    Tea.find({}, (err, teas) => {
        if (err) {
            console.log(err)
        } else {
            res.render("teas", {teas: teas})
        }
    })
})

// NEW route: form to create nezw products
router.get('/teas/new', (req, res) => {
    res.render("new")
})

// CREATE route: create new route from form info
router.post('/teas', (req, res) => {
    Tea.create(req.body.tea, (err, newTea) => {
        if (err){
            console.log(err)
        } 
    })
    res.redirect("/teas")
})

// EDIT route: edit current product
router.get("/teas/:id/edit", (req, res) => {
    Tea.findById(req.params.id, (err, foundTea) => {
        res.render("edit", {tea: foundTea})
    })
})

// UPDATE route: update current product
router.put("/teas/:id", (req, res) => {
    Tea.findByIdAndUpdate(req.params.id, req.body.updatedTea, (err, updated_tea) => {
        if (err) {
            console.log(err)
        }
        res.redirect("/teas")
    })
})

// DESTROY route
router.delete("/teas/:id", (req, res) => {
    Tea.findByIdAndDelete(req.params.id, (err) => {
        if (err){
            console.log(err)
        }
        res.redirect("/teas")
    })
})

module.exports = router;