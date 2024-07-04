const { response } = require('express');
const jwt = require('jsonwebtoken')
require("dotenv").config();

function verifyUser(req, res, next){
    const password = req.headers.authorization;
    if(password === "123"){
        next();
        return;
    }
    return res.status(401).json({message:"Unauthorized"});
}
const authenticate = (req,res, next) =>{
    const token = req.headers.authorization;
        const {valid, decodedToken} = validateToken(token);
    if(!valid){
        return res.status(401).json({message: 'Unauthorized'});
    }
    req.userId = decodedToken.userId;
    req.role = decodedToken.role;
    next()
}

//we are calling a function inside a function
const authorize = allowedRoles => (req, res, next) =>{
    if(!allowedRoles.includes(req.role)){
        return res.status(401).json({message:"Action not allowed for this role"});
    }
    next();
}

const validateToken = (token) =>{
    try{
        const decodedToken = jwt.verify(token, process.env.SECRET_KEY);
        return { valid: true, decodedToken}
    }
    catch(err){
        console.log(err)
        return {valid: false};

    }
}

const generateToken = (payload)=>{
    const secretKey = process.env.SECRET_KEY;
    const token = jwt.sign(payload, secretKey);
    return token;

}

module.exports = {
    authenticate,
    generateToken,
    authorize
}