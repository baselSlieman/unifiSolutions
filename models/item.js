const mongoose = require('mongoose');

const itemSchema=new mongoose.Schema({
name:{
    type:String,
    required:true
},
weight:{
    type:Number,
    required:true
}
});
module.exports=mongoose.model('Item',itemSchema);