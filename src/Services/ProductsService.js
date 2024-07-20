const db = require('better-sqlite3')('app.db');

function getProducts(){
    const query = 'SELECT * FROM Products;';
    const result = db.prepare(query).all() //.get()returns 1 object, .all()returns a list
    return result
}

const getProductById = (productId) =>{
const query = 'SELECT * FROM Products WHERE id = ?;';
    const result = db.prepare(query).get(productId) 
    return result
}

const createProduct = (product)=>{
    const query =`INSERT INTO Products (name, price, category, currency) VALUES (?,?,?,?)`
    const result = db.prepare(query).run(product.name, product.price, product.category, product.currency)
    if(result.changes === 0){
        throw new Error("An error occured when  inserting a product in the database")
    }
}

const updateProduct = (productId, product)=>{
    const query = `UPDATE Products SET name = ?, price = ?, category = ?, currency = ? WHERE id = ?`;
    const result = db.prepare(query).run(product.name, product.price, product.category, product.price, productId);
    if(result.changes === 0){
       return false
    }
    return true
}

const deleteProduct= (productId)=>{
    const query = `DELETE FROM Products WHERE id = ?`;
    const result = db.prepare(query).run(productId);
    if(result.changes ===0){
        return false
    }
    return true
} 

module.exports = {getProducts, getProductById, createProduct, updateProduct, deleteProduct};