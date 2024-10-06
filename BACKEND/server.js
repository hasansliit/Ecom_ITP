const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express();
require("dotenv").config();
const path = require('path');



// Set the PORT, defaulting to 8070 if not provided
const PORT = process.env.PORT || 8070;

// Middleware for CORS and JSON body parsing
app.use(cors());
app.use(bodyParser.json());

// Set the MongoDB connection URL
const URL = process.env.MONGODB_URL;

// Connect to MongoDB using Mongoose with specific options
mongoose.connect(URL, {

});

// Once connected, log a success message
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('Mongodb Connection success!');
});

const adminRoute = require('./routes/admin.route');
const productRouter = require("./routes/products.route.js");

app.use("/product", productRouter);
app.use('/api', adminRoute);

// Start the server on the specified PORT
app.listen(PORT, () => {
  console.log(`Server is up and running on port number: ${PORT}`);
});

// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));