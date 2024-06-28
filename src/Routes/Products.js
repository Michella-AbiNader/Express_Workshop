const express = require('express');
const router = express.Router();
const Products = require("../Services/ProductsService");
const verifyUser = require("../Services/AuthService")
// or const {getProducts, createProducts = require("../Services/ProductsService")};

router.get("/products", (request, response)=>{
    const json = Products.getProducts();
    return response.status(200).json(json);
});

router.post('/products', verifyUser, (req, res)=>{
    const body = req.body;
    Products.createProduct();
    return res.status(201).json({message: "product created"})
});

router.put('/products', (req, res)=>{
    console.log(req.body);
    console.log(req.price)
    return res.status(201).json({message: "product updated"})
});

router.delete('/products', (req, res)=>{
    console.log(req.body);
    console.log(req.price)
    return res.status(201).json({message: "product deleted"})
});

module.exports = router;