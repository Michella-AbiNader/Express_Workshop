const errorHandler = (error, req, res, next)=>{
    console.log(error);
    return res.status(201).json({
            message:'something went wrong'
        });
}
module.exports = errorHandler;