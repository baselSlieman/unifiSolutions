var express = require('express');
var router = express.Router();
const {query,validationResult,matchedData} = require('express-validator');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
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
