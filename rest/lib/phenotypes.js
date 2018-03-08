var fs = require("fs");
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
      code : randomPhenotype.characteristic + " : " + randomType,
      shortCode : randomPhenotype.characteristic,
      texte : randomType
    });
  }
  return phenotypes;
}
module.exports.getRandomPhenotypes = getRandomPhenotypes;
module.exports.openSNP_phenotypes = jsonContent;
