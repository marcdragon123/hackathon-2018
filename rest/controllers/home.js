// gene controller routes
var express = require('express');

var create = function(models){
  var router = express.Router();

  // get /api/gene/
  router.get('/',(req,res) => {
    res.render('home', {models : models});
  });

  return router;
}

module.exports = {create : create};
