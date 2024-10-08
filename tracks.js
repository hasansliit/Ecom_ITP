const router = require("express").Router();
let Order = require("../models/Bill"); // Importing the Order model

// Route for creating (adding orders)
// POST: http://localhost:8070/track/add
router.route("/add").post((req, res) => {
    const orderId = req.body.orderId;
    const customerId = req.body.customerId;
    const items = req.body.items; // assuming items is an array
    const shippingAddress = req.body.shippingAddress;
    const status = req.body.status || "Pending"; // default status is 'Pending'
    const totalAmount = Number(req.body.totalAmount);
    const discount = Number(req.body.discount) || 0; // default discount is 0
    const shippingCost = Number(req.body.shippingCost);
    const trackingNumber = req.body.trackingNumber || null;

    // Create a new Order object
    const newOrder = new Order({
        orderId,
        customerId,
        items,
        shippingAddress,
        status,
        totalAmount,
        discount,
        shippingCost,
        trackingNumber
    });

    // Save the order to the database
    newOrder.save()
        .then(() => {
            res.json("Order Added");
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with adding order", error: err.message });
        });
});

// Route for displaying all orders
// GET: http://localhost:8070/track/display
router.route("/display").get((req, res) => {
    Order.find()
        .then((orders) => {
            res.json(orders); // Send all orders to the frontend
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with fetching orders", error: err.message });
        });
});

// Route for updating an order by ID
// PUT: http://localhost:8070/track/update/:id
router.route("/update/:id").put(async (req, res) => {
    let orderId = req.params.id;
    const { customerId, items, shippingAddress, status, totalAmount, discount, shippingCost, trackingNumber } = req.body;

    const updateOrder = {
        customerId,
        items,
        shippingAddress,
        status,
        totalAmount,
        discount,
        shippingCost,
        trackingNumber
    };

    await Order.findByIdAndUpdate(orderId, updateOrder)
        .then(() => {
            res.status(200).send({ status: "Order Updated" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with updating order", error: err.message });
        });
});

// Route for deleting an order by ID
// DELETE: http://localhost:8070/track/delete/:id
router.route("/delete/:id").delete(async (req, res) => {
    let orderId = req.params.id;

    await Order.findByIdAndDelete(orderId)
        .then(() => {
            res.status(200).send({ status: "Order Deleted" });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with deleting order", error: err.message });
        });
});

// Route for fetching a single order by ID
// GET: http://localhost:8070/track/get/:id
router.route("/get/:id").get(async (req, res) => {
    let orderId = req.params.id;

    await Order.findById(orderId)
        .then((order) => {
            res.status(200).send({ status: "Order fetched", order });
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send({ status: "Error with fetching order", error: err.message });
        });
});

module.exports = router; // Export the router
