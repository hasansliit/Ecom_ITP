const express = require('express');
const router = express.Router();
const Bill = require('../models/Bill'); // Adjust the path as necessary

// Create a new bill
router.post('/', async (req, res) => {
    try {
        const bill = new Bill({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            city: req.body.city,
            address: req.body.address,
            email: req.body.email,
            phone: req.body.phone,
            orderNotes: req.body.orderNotes,
            products: req.body.products || 53.98, // Default value if not provided
            shipping: req.body.shipping || 'Gratis', // Default value if not provided
            totalAmount: req.body.totalAmount || 53.98, // Default value if not provided
        });

        const savedBill = await bill.save();
        res.status(201).json(savedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Retrieve all bills
router.get('/', async (req, res) => {
    try {
        const bills = await Bill.find();
        res.json(bills);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Retrieve a specific bill by ID
router.get('/:id', async (req, res) => {
    try {
        const bill = await Bill.findById(req.params.id);
        if (!bill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(bill);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

// Update a specific bill by ID
router.put('/:id', async (req, res) => {
    try {
        const updatedBill = await Bill.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
        });
        if (!updatedBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json(updatedBill);
    } catch (error) {
        res.status(400).json({ message: error.message });
    }
});

// Delete a specific bill by ID
router.delete('/:id', async (req, res) => {
    try {
        const deletedBill = await Bill.findByIdAndDelete(req.params.id);
        if (!deletedBill) {
            return res.status(404).json({ message: 'Bill not found' });
        }
        res.json({ message: 'Bill deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;
