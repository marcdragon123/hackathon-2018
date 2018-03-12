var models            = require('../models/_models');
var panels            = require('./panels');

var AddMissingGenotypes = function(hashOfSNPs, genotypes){
  var hashSNPsCovered = {};
  for(var i = 0; i < genotypes.length; i++){
    if(!hashSNPsCovered[genotypes[i].snpRS]){
      hashSNPsCovered[genotypes[i].snpRS] = true;
    }
  }
  for(var snp in hashOfSNPs){
    if(!hashSNPsCovered[snp]){
      var geno = hashOfSNPs[snp][Math.floor((Math.random() * hashOfSNPs[snp].length))];
      if(geno){
        genotypes.push(geno);
        // console.log(JSON.stringify(geno, undefined, "   "));
      }
    }
  }
  return genotypes;
}

module.exports.AddMissingGenotypes = AddMissingGenotypes;
