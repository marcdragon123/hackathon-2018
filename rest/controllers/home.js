// gene controller routes
var express = require('express');
var qadna   = require('../lib/qadna');

<<<<<<< HEAD
var create = function(models, writable){
=======
var create = function(models, modelsInfo) {
>>>>>>> c61c2524c536f5f873d5e5aa3e64f3efc9b7da7c
  var router = express.Router();

  router.get('/',(req,res) => {
    res.render('landing', {models: models, info: modelsInfo});
  });

  var callBackRecaller = function(req, res, nbTODOs){
    qadna.createRandomPatient({}, function(patient){
      if(nbTODOs > 0)
        callBackRecaller(req, res, nbTODOs - 1);
      else{
        res.render('json', {json : patient, name : "Multiple", schema : models.patients.schema});
        console.log("Created all patients");
      }
    });
  }
  if(writable){
    router.post('/createFiveThousandPatients',(req,res) => {
      callBackRecaller(req, res, 500);
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
  }
  return router;
}

module.exports = {create : create};
