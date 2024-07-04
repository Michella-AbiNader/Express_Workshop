const express = require('express');
const app = express()
app.use(express.json());
require("dotenv").config();

const Products = require("./Routes/Products")
const Auth = require('./Routes/Auth');
const errorHandler = require('./Services/Utils/ErrorHandler');
const tryCatch = require('./Services/Utils/TryCatch');
app.use(Products);
app.use(Auth);


app.use(tryCatch)
app.use(errorHandler)//put it at the end of the use.apps
const PORT = process.env.PORT || 3031
app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}`);
})