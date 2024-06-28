const express = require('express');
const app = express()
app.use(express.json());
require("dotenv").config();

const Products = require("./Routes/Products")
app.use(Products);


const PORT = process.env.PORT || 3031
app.listen(PORT, ()=>{
    console.log(`App is listening on Port ${PORT}`);
})