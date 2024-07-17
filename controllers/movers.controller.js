const {query,validationResult,matchedData} = require('express-validator');
const Mover = require('../models/mover');

const getAllMovers = async(req,res)=>{
    const movers = await Mover.find();
    res.json(movers);
}

const addMover=async(req,res)=>{
    console.log("body",req.body);
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        return res.status(400).json(errors.array());
    }
    const newMover=new Mover(req.body);
    await newMover.save();
    res.status(201).json(newMover)
}

module.exports={getAllMovers,addMover};