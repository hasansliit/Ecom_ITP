const express = require('express');
const router = express.Router();
const Dashboard = require('../models/Dashboard'); // Import the Dashboard model

// Get dashboard data
router.get('/', async (req, res) => {
    try {
        const dashboardData = await Dashboard.findOne(); // Fetch the dashboard data
        if (!dashboardData) {
            return res.status(404).json({ message: 'Dashboard data not found' });
        }
        res.json(dashboardData);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Update dashboard data
router.post('/', async (req, res) => {
    const { totalRevenue, totalExpenses, churnRate, compliance } = req.body;
    try {
        const dashboardData = await Dashboard.findOneAndUpdate(
            {},
            { totalRevenue, totalExpenses, churnRate, compliance },
            { new: true, upsert: true } // Create if it doesn't exist
        );
        res.json(dashboardData);
    } catch (error) {
        res.status(500).send(error);
    }
});

// Optional: Delete dashboard data (if needed in the future)
router.delete('/', async (req, res) => {
    try {
        const deletedData = await Dashboard.deleteMany(); // Delete all dashboard data
        res.status(204).send(); // No content to send back
    } catch (error) {
        res.status(500).send(error);
    }
});

// Optional: Update specific metrics (if needed in the future)
router.put('/', async (req, res) => {
    const { totalRevenue, totalExpenses, churnRate, compliance } = req.body;
    try {
        const dashboardData = await Dashboard.findOneAndUpdate(
            {},
            { totalRevenue, totalExpenses, churnRate, compliance },
            { new: true }
        );
        if (!dashboardData) {
            return res.status(404).json({ message: 'Dashboard data not found' });
        }
        res.json(dashboardData);
    } catch (error) {
        res.status(500).send(error);
    }
});

module.exports = router;
