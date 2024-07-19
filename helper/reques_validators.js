const {body,query,validationResult,matchedData} = require('express-validator');

const addMoverCheckbody=()=>{
    return body('weightlimit').notEmpty().withMessage("Weight Limit is required!");
}

const addItemCheckbody=()=>{
    return [
        body('name').notEmpty().withMessage("Item name is required!"),
        body('weight').notEmpty().withMessage("Item Weight is required!")
    ]
}
module.exports={addMoverCheckbody,addItemCheckbody}