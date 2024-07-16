var express = require('express');
var router = express.Router();
const {query,validationResult,matchedData} = require('express-validator');
const {MongoClient}=require('mongodb');
const url = "mongodb+srv://unifiuser:unifi2024@unifidb.0y81c1u.mongodb.net/?retryWrites=true&w=majority&appName=unifidb";
const client =new MongoClient(url);
const main=async()=>{
  await client.connect();
  console.log("cinnected succefully");
  const db=client.db("unifisolutions");
  const collection =db.collection("mover");
  const data=await collection.find().toArray();
  console.log("data",data);
}
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/mongodb', function(req, res, next) {
  main();
});

router.get('/hello', query('person').notEmpty().escape(), (req, res) => {
  const result = validationResult(req);
  if (result.isEmpty()) {
    //Accessing validated data
    const data = matchedData(req);
    return res.send(`Helloo, ${data.person}!`);
  }
  res.send({ errors: result.array() });
});


module.exports = router;
