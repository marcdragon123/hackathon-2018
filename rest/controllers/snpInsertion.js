// gene controller routes
var express             = require('express');
var openSNP              = require('../lib/openSNP');
var models              = require('../models/_models'); // Loading all models

var create = function(models){
  var router = express.Router();

  // Update an item
  router.post('/:_snp',(req,res) => {
    openSNP.addSNP(req.params._snp, function(err, document){
      if (err)
        res.send(err);
      else
        res.render('json', {json : document, name : "polymorphism", schema : models["polymorphisms"].schema });
    });
  });

  return router;
}

module.exports = {create : create};
