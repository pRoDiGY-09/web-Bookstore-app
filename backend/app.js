const express=require('express');
const mongoose=require('mongoose');
const cors=require('cors');
const bookRoute=require('../backend/books/book');
const cartRoute=require('../backend/cart/cart');
const userRoute=require('../backend/users/user');
const passport= require('passport');
require('dotenv').config();



port=3000;
 
const app=express();
app.use(cors());
app.use(express.json());
app.use('/api',bookRoute)
app.use('/api',cartRoute)
app.use('/api',userRoute)

// initialize(passport);
require('./users/passport-start')(passport);
app.use(passport.initialize());
// app.use(passport.session());


const url=process.env.MONGO_URL
console.log(url)
mongoose.connect(url)
.catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log("server up at 3000!")
})




