const mongoose = require('mongoose');

// Define the schema for the dashboard data
const DashboardSchema = new mongoose.Schema({
    totalRevenue: { type: Number, default: 0 },  // Total revenue
    totalExpenses: { type: Number, default: 0 }, // Total expenses
    churnRate: { type: Number, default: 0 },     // Churn rate
    compliance: { type: Number, default: 0 },    // Compliance metric
});

// Export the model so it can be used in other parts of the application
module.exports = mongoose.model('Dashboard', DashboardSchema);
