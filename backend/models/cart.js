const mongoose=require('mongoose');

const cartProd=new mongoose.Schema({
    id:Number,
    name:String,
    cover:String,
    quantity:Number,
    price:Number,
})


module.exports=mongoose.model('cartbook',cartProd);