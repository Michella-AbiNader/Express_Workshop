const express = require('express');
const router = express.Router();
const Products = require("../Services/ProductsService");
// or const {getProducts, createProducts = require("../Services/ProductsService")};
const verifyUser = require("../Services/AuthService")
const {authenticate, authorize} = require('../Services/AuthService');
const tryCatch = require('../Services/Utils/TryCatch');
const {validateProducts} = require('../Services/Utils/Validator')


router.get(
    "/products",
    authenticate, 
    authorize(['admin', 'staff']), 
    tryCatch( (request, response)=>{
    const json = Products.getProducts();
    return response.status(200).json(json);
}
));

router.post(
    '/products', 
    authenticate, 
    authorize(['admin']), 
    validateProducts, 
    tryCatch( (req, res)=>{ //or verifyUser instead of authenticate
        const body = req.body;
        Products.createProduct();
        return res.status(201).json({message: "product created"})
}));

router.put(
    '/products', 
    authenticate, 
    authorize(['admin']), 
    validateProducts, 
    tryCatch((req, res)=>{
    console.log(req.body);
    console.log(req.price)
    return res.status(201).json({message: "product updated"})
}));

router.delete('/products', tryCatch((req, res)=>{
    console.log(req.body);
    console.log(req.price)
    return res.status(201).json({message: "product deleted"})
}));

module.exports = router;