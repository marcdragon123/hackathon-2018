// gene controller routes
var express = require('express');
var qadna   = require('../lib/qadna');

var create = function(models){
  var router = express.Router();

  // get /api/gene/
  router.get('/',(req,res) => {
    res.render('home', {models : models});
  });

  router.post('/',(req,res) => {
    //patient info : name, birth, gender
    var info = {};
    //cycle through body content to add properties
    for(var property in req.body){
      info[property] = req.body[property];
    }
    qadna.createRandomPatient(info, function(patient){
      res.render('home', {models : models});
    });
  });
  return router;
}

module.exports = {create : create};
