var models            = require('../models/_models');

console.log("Reading some Phenotypes from Database");

var characteristics = [];
var tmpHash = {};
models["phenotypes"].find().exec(function(err, documents){
  if(err)
    console.log("wfwert : " + err);
  for(var i = 0; i < documents.length; i++){
    if(documents[i].characteristic){
      if(!tmpHash[documents[i].characteristic]){
        tmpHash[documents[i].characteristic] = [];
        characteristics.push(tmpHash[documents[i].characteristic]);
      }
      tmpHash[documents[i].characteristic].push(documents[i]);
    }
  }
  console.log("All phenotypes cashed");
});

var getRandomPhenotypes = function(nbPhenotypes){
  var phenotypes = [];
  var phenoHash = {};
  for(var i = 0; i < nbPhenotypes; i++){
    var variations = characteristics[Math.floor((Math.random() * characteristics.length))];
    var randomType = variations[Math.floor((Math.random() * variations.length))];
    if(!phenoHash[randomType.characteristic]){
      phenotypes.push(randomType);
      phenoHash[randomType.characteristic] = true;
    }
  }
  return phenotypes;
}
module.exports.getRandomPhenotypes = getRandomPhenotypes;
