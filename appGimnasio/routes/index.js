var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', {
    title: 'Express',
    animales: ['perro', 'gato', 'castor', 'león', 'wombat', 'grillo']
  });
});

module.exports = router;
