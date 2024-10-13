const express= require('express')
const mongoose = require('mongoose')

const ReviewRoute = require('./routes/Reviews.route.js');
const app = express()
const cors = require("cors")

app.use(express.json())
app.use(cors())

app.use("/review",ReviewRoute)

mongoose.connect("mongodb+srv://admin:fhi00XoMrFZHVlNM@cluster0.40jt53t.mongodb.net/itp_project")
    .then(()=>console.log("connected to mongo"))
    .then(()=>{
        app.listen(5000)
    })
    .catch((err)=> console.log((err)))
