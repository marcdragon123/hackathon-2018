// gene controller routes
var express = require('express');
var qadna   = require('../lib/qadna');

var create = function(models){
  var router = express.Router();

  router.get('/',(req,res) => {
    res.render('landing', {models : models});
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

  router.post('/createFiveThousandPatients',(req,res) => {

    callBackRecaller(req, res, 500);
    // for(var ideux = 1; ideux < 50; ideux++){
    //   qadna.createRandomPatient({}, function(patient){});
    // }
    //
    // qadna.createRandomPatient({}, function(patient){
    //   res.render('json', {json : patient, name : patient.name, schema : models.patients.schema});
    // });
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
