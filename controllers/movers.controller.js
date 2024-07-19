const {query,validationResult,matchedData} = require('express-validator');
const Mover = require('../models/mover');
const Item = require('../models/item');
const httpStatusText =require('../helper/httpStatustext');
const logger = require('../helper/logger.js')

// List who completed the most missions with a fetch endpoint
const listMostComplete=async(req,res)=>{
    const movers = await Mover.find({}).sort({messionsCompleted:-1});
    res.json({status:httpStatusText.SUCCESS,data:{movers}});
}

//function to get movers docs from 'mover' collection in mongodb
const getAllMovers = async(req,res)=>{
    const query=req.query;
    const limit= query.limit || 10;
    const page= query.page || 1;
    const skip= (page-1) * limit;
    const movers = await Mover.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:httpStatusText.SUCCESS,data:{movers}});
}

//function to get items docs from 'item' collection in mongodb
const getAllItems = async(req,res)=>{
    const query=req.query;

    //using pagination
    const limit= query.limit || 10;
    const page= query.page || 1;
    const skip= (page-1) * limit;
    
    const items = await Item.find({},{"__v":false}).limit(limit).skip(skip);
    res.json({status:httpStatusText.SUCCESS,data:{items}});
}



//function to load mover with item
const loadMover=async(req,res)=>{
    //initial variable for sum items weight in mover
    var moverItemsWeight=0;
    //Get the ID of the mover we want to load with items
    const moverId= req.body.moverId;
    //Get the ID of the item we want to load
    const itemId =req.body.itemId; 
    //Get mover from database
    const mover = await Mover.findById(moverId);
    //if mover not exist: send fail message
    if(!mover){
        res.json(404).json({status:httpStatusText.FAIL,data:{mover:null}});
    }
    //prevent loading items when mover state is: on-mession
    if(mover.questState==="on-mession"){
        return res.json({status:httpStatusText.FAIL,data:{message:"prevent loading because of the mover on-mission"}});
    }
    //calculate mover items weight
    for (const element of mover.items) {
        await new Promise(async (resolve1) => {
          const item = await Item.findById(element.toHexString());   
          console.log("asd",item); 
          moverItemsWeight+=item.weight
          resolve1();
        }
      )}

    //Get item from database
    const item = await Item.findById(itemId);
    //if item not exist: send fail message
    if(!item){
        res.json(404).json({status:httpStatusText.FAIL,data:{item:null}});
    }
    //Check whether the weight limit of the mover has been exceeded
    if((moverItemsWeight+item.weight)>mover.weightlimit){
        return res.json({status:httpStatusText.FAIL,data:{message:"total items weight is larger than limit"}});
    }
    //load item
    mover.items.push(item)
    //update state to be 'loading'
    mover.questState="loading"
    //save updates to database
    await mover.save()
    //send success status with mover data
    logger.info("success load item: "+item.name+", to mover");
    res.json({status:httpStatusText.SUCCESS,data:{mover:mover}});
}

const startMession=async(req,res)=>{
    //get mover we want to start
    const moverId= req.params.moverId;
    const mover = await Mover.findById(moverId);
    if(!mover){
        res.json(404).json({status:httpStatusText.FAIL,data:{mover:null}});
    }
    //start only movers that is in loading state
    if(mover.questState!=="loading"){
        return res.json({status:httpStatusText.FAIL,data:{message:"you can start mover when loading state"}});
    }
    //update mover status
    await Mover.updateOne({_id: moverId},{$set:{questState:"on-mession"}})
    logger.info("success start mession, mover: "+mover.id);
    res.json({status:httpStatusText.SUCCESS,data:{message:"success start mession"}});
}

const endMession=async(req,res)=>{
    //get mover we want to end
    const moverId= req.params.moverId;
    const mover = await Mover.findById(moverId);
    if(!mover){
        res.json(404).json({status:httpStatusText.FAIL,data:{mover:null}});
    }
    //end only movers that is in 'on-mession' state
    if(mover.questState!=="on-mession"){
        return res.json({status:httpStatusText.FAIL,data:{message:"you can end mover when (on-mession) state"}});
    }

    //clear mover items
    mover.items=[];
    //update status
    mover.questState="resting"
    //increase 'messionsCompleted' by one 1
    mover.messionsCompleted=(mover.messionsCompleted==undefined?0:mover.messionsCompleted)+1
    await mover.save()
    logger.info("success end mession, mover: "+mover.id);
    res.json({status:httpStatusText.SUCCESS,data:{message:"success end mession"}});
}

const addMover=async(req,res)=>{
    try{
        //validate request body
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({status:httpStatusText.FAIL,data:{validatorsError:errors.array()}})
        }
        //create mover object
        const mover = {
            weightlimit:req.body.weightlimit,
            questState:"resting",
            messionsCompleted:0,
            items:[]
        }
        //create instance of mover schema with data
        const newMover=new Mover(mover);
        await newMover.save();
        res.json({status:httpStatusText.SUCCESS,data:{newMover}});
    }catch(err){
        res.json(400).json({status:httpStatusText.Error,data:null,message:err.message,code:400});
    }
}

const addItem=async(req,res)=>{
    try{
        const errors = validationResult(req);
        if(!errors.isEmpty()){
            return res.status(400).json({status:httpStatusText.FAIL,data:{validatorsError:errors.array()}})
        }
        const newItem=new Item(req.body);
        await newItem.save();
        res.json({status:httpStatusText.SUCCESS,data:{newItem}});
    }catch(err){
        res.json(400).json({status:httpStatusText.Error,data:null,message:err.message,code:400});
    }
}

module.exports={getAllMovers,getAllItems,addMover,addItem,loadMover,startMession,endMession,listMostComplete};