var models            = require('../models/_models');
var panels            = require('./panels');

var AddMissingGenotypes = function(){
  var hashSNPs = {};
  var AllSNPS = [];
  var concat = panels.SNPS.concat(panels.NQX).concat(panels.PGX_PRO);
  for(var i = 0; i < concat.length; i++){
    if(!hashSNPs[concat[i]]){
      hashSNPs[concat[i]] = true;
      AllSNPS.push(concat[i]);
    }
  }
  console.log("Creating some Missing Genotypes for " + AllSNPS.length + " SNPs");
  var hashOfSNPs = {};
  var AminoAcidCouples = [['AA','AT','TT'],['CC','CT','TT'],['GG','GT','TT'],['AA','AC','CC'],['GG','CG','CC'],['AA','AG','GG']];
  models.genotypes.find({snpRS : {$in : AllSNPS}}).exec(function(err, documents){
    if(err)
      console.log(err);
    console.log("Got " + documents.length + " corresponding genotypes");
    hashOfSNPs = {};
    var nbCoveredSNPs = 0;
    for(var i = 0; i < documents.length; i++){
      if(!hashOfSNPs[documents[i].snpRS]){
        hashOfSNPs[documents[i].snpRS] = true;
        nbCoveredSNPs++;
      }
    }
    console.log("Marked " + nbCoveredSNPs + " SNPs as covered");
    // console.log(JSON.stringify(hashOfSNPs, undefined, "   "));
    var newGenotypes = [];
    for(var i = 0; i < AllSNPS.length; i++){
      if(!hashOfSNPs[AllSNPS[i]]){

        var arrayAA = AminoAcidCouples[Math.floor((Math.random() * AminoAcidCouples.length))];
        console.log("SNP : " + AllSNPS[i] + JSON.stringify(arrayAA))
        for(var j = 0; j < arrayAA.length; j++){
          newGenotypes.push({
              code: AllSNPS[i] + "[" + arrayAA[j] + "]",
              snpRS: AllSNPS[i],
              dnaSequence: arrayAA[j],
              dnaSequenceReported: arrayAA[j],
              count: 1
            });
        }
      }
    }

    // models["genotypes"].create(newGenotypes, function(err){
    //   if(err)
    //     console.log("Could not save phenotypes : " + err);
      console.log("Created " + newGenotypes.length + " missing snpRS");
      console.log(JSON.stringify(newGenotypes, undefined, "   "));
    // });
  });
}


module.exports.AddMissingGenotypes = AddMissingGenotypes;
