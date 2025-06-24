const mongoose=require('mongoose');
const { type } = require('os');

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    admin:{
      type:Boolean, 
      required:true  
    }
})

module.exports= mongoose.model('Users',UserSchema)