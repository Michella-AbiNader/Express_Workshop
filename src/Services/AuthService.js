function verifyUser(req, res, next){
    const password = req.headers.authorization;
    if(password === "123"){
        next();
        return;
    }
    return res.status(401).json({message:"Unauthorized"});
}

module.exports = verifyUser;