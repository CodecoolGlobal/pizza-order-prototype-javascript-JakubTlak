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


// GET /api/order - Retrieve the list of orders
router.route("/order")
    .get((request, response) => {
        const orders = getDataObject("order.json");
        response.json(orders);
    })

// POST /api/order - Add a new order to the list
router.route("/order")
    .post((req, res) => {
        const newOrder = req.body;
        if (!isValidOrder(newOrder)) {
            return res.status(400).json({ error: 'Invalid order object' });
        }
        const orderId = orders.length + 1;
        newOrder.id = orderId;
        orders.push(newOrder);
        res.status(201).json(orders);
    });

// Function to validate the order object
function isValidOrder(order) {
    if (
        !order ||
        typeof order !== 'object' ||
        !Array.isArray(order.pizzas) ||
        !order.date ||
        typeof order.date !== 'object' ||
        typeof order.date.year !== 'number' ||
        typeof order.date.month !== 'number' ||
        typeof order.date.day !== 'number' ||
        typeof order.date.hour !== 'number' ||
        typeof order.date.minute !== 'number'
    ) {
        return false;
    }
    return true;
}
module.exports = router;