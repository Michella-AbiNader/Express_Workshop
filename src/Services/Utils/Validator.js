const joi = require("joi");
//check the if the fields the user provided are valid

const validator = schema =>(req,res,next) =>{
    const {error} = schema.validate(req.body, { abortEarly: false});//do not abort before it ends(show all missing fields)
        if(error){
            var message = ""
            for(let key in error.details){
                message+= error.details[key].message + '\n'
            }
            return res.status(400).json({
                message: message
            })
        }
        next();
}

//to make sure the user provide all fields(these fields are reuired, and no other fields are permitted)
const productSchema = joi.object({
    name: joi.string().required(),
    price: joi.number().required(),
    category: joi.string().required(),
    currency: joi.string().valid("USD", "LBP").required() //valid to provide the valid values
})

const loginSchema = joi.object({
    username: joi.string().required(),
    password: joi.string().min(8).required()
})
module.exports = {
    validateProducts: validator(productSchema),
    validateLogin: validator(loginSchema)
}