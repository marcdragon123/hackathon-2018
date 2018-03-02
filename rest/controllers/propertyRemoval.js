// gene controller routes
var express             = require('express');
var db_admin            = require('../lib/db_admin');
var models              = require('../models/_models'); // Loading all models

var create = function(models){
  var router = express.Router();

  router.get('/',(req,res) => {
    db_admin.unsetPropertiesForModel(models.nutriments, function(err){
      if(err)
        res.send(err);
      res.render('landing', {models : models});
    })
  });

  // Update an item
  router.get('/:_model',(req,res) => {
    db_admin.unsetPropertiesForModel(models[req.params._model], function(err){
      if (err)
        res.send(err);
      res.render('landing', {models : models});
    });
  });

  return router;
}

module.exports = {create : create};
