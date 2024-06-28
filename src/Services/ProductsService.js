function getProducts(){
    return {name:'salads', price: 20, currency: "USD"};
}

const createProduct = ()=>{
    console.log("Product created")
}

module.exports = {getProducts, createProduct};