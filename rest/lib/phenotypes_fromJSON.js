var fs                = require("fs");
var models            = require('../models/_models');

console.log("Reading some JSON store");
// Get content from file
var contents = fs.readFileSync("/Users/caronlio/Documents/github/hackathon-2018/data/openSNP_phenotypes.json");
// Define to JSON type
var jsonContent = JSON.parse(contents);

var getRandomPhenotypes = function(nbPhenotypes){
  var phenotypes = [];
  for(var i = 0; i < nbPhenotypes; i++){
    var randomPhenotype = jsonContent[Math.floor((Math.random() * jsonContent.length))];
    var randomType = randomPhenotype.known_variations[Math.floor((Math.random() * randomPhenotype.known_variations.length))];
    phenotypes.push({
      name : randomPhenotype.characteristic + " : " + randomType,
      characteristic : randomPhenotype.characteristic,
      texte : randomType
    });
  }
  return phenotypes;
}

// var saveAllPhenotypes = function(callback){
//   var phenotypes = [];
//   for(var i = 0; i < jsonContent.length; i++){
//     var phenotype = jsonContent[i];
//     for(var j = 0; j < phenotype.known_variations.length ; j++){
//       phenotypes.push({
//         name : phenotype.characteristic + " : " + phenotype.known_variations[j],
//         characteristic : phenotype.characteristic,
//         texte : phenotype.known_variations[j]
//       });
//     }
//   }
//   console.log(JSON.stringify(phenotypes, undefined, "   "));
//   models["phenotypes"].create(phenotypes, function(err){
//     if(err)
//       console.log("Could not save phenotypes : " + err);
//     callback();
//   });
// }
module.exports.getRandomPhenotypes = getRandomPhenotypes;
// module.exports.saveAllPhenotypes = saveAllPhenotypes;
module.exports.openSNP_phenotypes = jsonContent;
