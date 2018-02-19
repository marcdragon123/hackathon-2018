// gene controller routes
var express = require('express');
var qadna   = require('../lib/qadna');

var create = function(models){
  var router = express.Router();

  router.get('/',(req,res) => {
    res.render('landing', {models : models});
  });

  router.post('/createRandomPatient',(req,res) => {
    //patient info : name, birth, gender
    var info = {};
    //cycle through body content to add properties
    for(var property in req.body){
      info[property] = req.body[property];
    }
    qadna.createRandomPatient(info, function(patient){
      res.render('json', {json : patient, name : patient.name, schema : models.patients.schema});
    });
  });
  return router;
}

module.exports = {create : create};
