const mongoose = require('mongoose');
const Schema=mongoose.Schema
const moverSchema=new mongoose.Schema({
weightlimit:{
    type:Number
},
questState:{
    type:String,
},
messionsCompleted:{
    type:Number,
},
items: [
    {type:Schema.Types.ObjectId,ref:"item"}
]
});
module.exports=mongoose.model('Mover',moverSchema);