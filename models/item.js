const mongoose = require('mongoose');
const Schema=mongoose.Schema
const itemSchema=new mongoose.Schema({
name:{
    type:String,
    required:[true,"item name is required"],
    unique:true,

},
weight:{
    type:Number,
    required:true
},
mover: {
    type:Schema.Types.ObjectId,ref:"mover"}
});

module.exports=mongoose.model('Item',itemSchema);