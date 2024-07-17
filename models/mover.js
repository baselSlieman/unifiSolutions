const mongoose = require('mongoose');

const moverSchema=new mongoose.Schema({
weightlimit:{
    type:Number,
    required:true
},
questState:{
    type:String,
    required:true
}
});
module.exports=mongoose.model('Mover',moverSchema);