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
    var result = {products: json}
    return response.status(200).json(result);
}
));

router.get(
    "/products/:id",
    authenticate, 
    authorize(['admin', 'staff']), 
    tryCatch( (request, response)=>{
    const product = Products.getProductById(request.params.id);
    if(!product){
        return response.status(404).json({message: "product not found"})
    }
    return response.status(200).json(product);
}
));

router.post(
    '/products', 
    authenticate, 
    authorize(['admin']), 
    validateProducts, 
    tryCatch( (req, res)=>{ //or verifyUser instead of authenticate
        const body = req.body;
        Products.createProduct(body);
        return res.status(201).json({message: "product created"})
}));

router.put(
    '/products/:id', 
    authenticate, 
    authorize(['admin']), 
    validateProducts, 
    tryCatch((req, res)=>{
        const id =req.params.id;
        const updated = Products.updateProduct(id, req.body)
        if(!updated){
            return res.status(400).json({message: "product not found"})
        }
        return res.status(200).json({message: "product updated"})
}));

router.delete('/products/:id', tryCatch((req, res)=>{
    const updated = Products.deleteProduct(req.params.id)
    if(!updated){
        return res.status(400).json({message: "product not found"})
    }
    return res.status(204).json({message: "product deleted"})
}));

module.exports = router;