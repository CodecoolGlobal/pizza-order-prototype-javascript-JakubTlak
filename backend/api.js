const express = require("express");
const router = express.Router();
const fs = require("fs");
const path = require("path");

function getDataObject(pathName) {
    return JSON.parse(fs.readFileSync(`${__dirname}/${pathName}`))
}

router.route("/pizza")
    .get((request, response) => {
        const data = getDataObject("pizza.json")
        response.send(data).status(200)
    })
    
router.route("/allergen")
    .get((request, response) => {
        const data = getDataObject("allergens.json")
        response.send(data).status(200)
    })

module.exports = router;