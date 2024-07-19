var express = require('express');
var router = express.Router();
const moverController=require('../controllers/movers.controller');
const {body,query,validationResult,matchedData} = require('express-validator');
const {addMoverCheckbody,addItemCheckbody}=require('../helper/reques_validators');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'UnifiSolutions' });
});
router.get('/api/movers', moverController.getAllMovers);
router.post('/api/addMover',addMoverCheckbody(),moverController.addMover);

router.get('/api/items', moverController.getAllItems);
router.post('/api/addItem',addItemCheckbody(),moverController.addItem);

router.post('/api/loadMover',moverController.loadMover);

router.get('/api/startMession/:moverId',moverController.startMession);
router.get('/api/endMession/:moverId',moverController.endMession);
router.get('/api/listMostComplete',moverController.listMostComplete);




module.exports = router;
