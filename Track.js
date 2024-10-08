const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Define the schema for orders (Track model)
const trackSchema = new Schema({
    orderId: {
        type: String,
        required: true,
        unique: true // Ensure order IDs are unique
    },
    customerId: {
        type: String,
        required: true
    },
    items: [{
        productId: {
            type: String,
            required: true
        },
        quantity: {
            type: Number,
            required: true,
            min: 1
        },
        price: {
            type: Number,
            required: true,
            min: 0
        }
    }],
    shippingAddress: {
        type: String,
        required: true
    },
    orderDate: {
        type: Date,
        default: Date.now // Automatically set the date when the order is created
    },
    status: {
        type: String,
        enum: ["Pending", "Shipped", "Delivered", "Cancelled"], // Possible order statuses
        default: "Pending"
    },
    totalAmount: {
        type: Number,
        required: true,
        min: 0
    },
    discount: {
        type: Number,
        default: 0, // Default discount to 0
        min: 0
    },
    shippingCost: {
        type: Number,
        required: true,
        min: 0
    },
    trackingNumber: {
        type: String,
        default: null // Tracking number can be null until order is shipped
    }
});

// Create the Mongoose model based on the schema
const Track = mongoose.model("Track", trackSchema);

module.exports = Track; // Export the Track model
