var getBioinformaticCalls = module.exports.getBioinformaticCalls = function(documents, callback){
  var genotypes = documents;
  models.bioinformatics.find({inputGenotypes : {$in: genotypes}}).populate('inputGenotypes').populate('outputGenotypes').lean().exec(function(err, triggerDocs){
    var triggers = [];
    for(var j = 0; j < triggerDocs.length; j++){
      if(triggerDocs[j].inputGenotypes.length > 0){
        var allInputMatched = true;
        for(var i = 0; i < triggerDocs[j].inputGenotypes.length; i++){
          var found = false;
          for(var k = 0; k < genotypes.length; k++){
            if(genotypes[k].snpRS == triggerDocs[j].inputGenotypes[i].snpRS &&
               genotypes[k].dnaSequence == triggerDocs[j].inputGenotypes[i].dnaSequence &&
               genotypes[k].phenoCode == triggerDocs[j].inputGenotypes[i].phenoCode &&
               genotypes[k].diploCode == triggerDocs[j].inputGenotypes[i].diploCode)
               found = true;
            // if(genotypes[k].equals(triggerDocs[j].inputGenotypes[i]))
            //   found = true;
          }
          if(!found)
            allInputMatched = false;
          // if(genotypes.indexOf(triggerDocs[j].inputGenotypes[i]) < 0)
          //   allInputMatched = false;
        }
        if(allInputMatched){
          // console.log("Trigger : " + JSON.stringify(triggerDocs[j]));
          triggers.push(triggerDocs[j]);
        }
      }
    }
    console.log("number of matching triggers : " + triggers.length);
    for(var j = 0; j < triggers.length; j++){
      for(var k = 0; k < triggers[j].outputGenotypes.length; k++){
        genotypes.push(triggers[j].outputGenotypes[k]);
        // console.log("Gene : " + triggers[j].outputGenotypes[k].geneID + "(" + triggers[j].outputGenotypes[k].code + ")");
      }
    }
    callback(genotypes);
  });
  // models.bioinformatics.find({$and : [{inputGenotypes : {$elemMatch : {$in : genotypes}}}, {isApproved : true}]}).lean().exec(function(err, triggers){
  //   console.log("number of matching triggers : " + JSON.stringify(triggers));
  //   for(var j = 0; j < triggers.length; j++){
  //     for(var k = 0; k < triggers[j].outputGenotypes.length; k++){
  //       genotypes.push(triggers[j].outputGenotypes[k]);
  //     }
  //   }
  //   callback(genotypes);
  // });
}

var getMatchingActitypes = module.exports.getMatchingActitypes = function(documents, actitypes){
  var matches = [];
  var genotypes = documents;
  //console.log("Matching " + genotypes.length + " genotypes to " + actitypes.length + " actitypes.");
  for(var aI = 0; aI < actitypes.length; aI++){
    var acti = actitypes[aI];
    // console.log(JSON.stringify(acti.genotypes));
    var foundAllGenotypes = true;
    var foundGenotypes = [];

    for(var rA = 0; rA < acti.genotypes.length; rA++){
      var foundOne = false;
      for(var gS = 0; gS < genotypes.length; gS++){
        if(!foundOne){
          // console.log(JSON.stringify (genotypes[gS]));
          if(acti.genotypes[rA].snpRS && acti.genotypes[rA].snpRS == genotypes[gS].snpRS && acti.genotypes[rA].dnaSequence && acti.genotypes[rA].dnaSequence.length > 0){
            if(genotypes[gS].dnaSequence && genotypes[gS].dnaSequence.indexOf(acti.genotypes[rA].dnaSequence) >= 0){
              foundOne = true;
              foundGenotypes.push(genotypes[gS]);
            }
          }
// console.log(genotypes[gS].geneID + " == " +acti.genotypes[rA].geneID);
          if(!foundOne && genotypes[gS].geneID == acti.genotypes[rA].geneID){
            if(acti.genotypes[rA].diploCode){
              if(genotypes[gS].diploCode == acti.genotypes[rA].diploCode){
                foundGenotypes.push(genotypes[gS]);
                foundOne = true;
              }
            } else if(acti.genotypes[rA].phenoCode){
              if( genotypes[gS].phenoCode == acti.genotypes[rA].phenoCode ||
                  genotypes[gS].phenoCodeEffective == acti.genotypes[rA].phenoCode){
                foundOne = true;
                foundGenotypes.push(genotypes[gS]);
              }
            }
          }
        }
      }
      if(!foundOne && !acti.genotypes[rA].reverse)
        foundAllGenotypes = false;
    }

    if(foundAllGenotypes && acti.genotypes.length > 0){
      matches.push({acti : acti, genotypes : foundGenotypes});
    }
  }
  return matches;
};


var computeRecommendations = module.exports.computeRecommendations = function(patient, callback){
  var locals = {};
  locals.patient = patient;
  locals.genotypes = patient.genotypes;
  locals.actiTypes = getMatchingActitypes(patient.genotypes, actiStatic);
  console.log("Number of matching actitypes : " + JSON.stringify(locals.actiTypes.length));
  // console.log("Actitypes : " + JSON.stringify(locals.actiTypes));
  var actiArray = [];
  for(var i = 0; i < locals.actiTypes.length; i++){
    actiArray.push(locals.actiTypes[i].acti._id.toString());
  }
  locals.actiTypesArray = actiArray;
  // var hashActi = {};
  // for(var i = 0; i < locals.actiTypes.length; i++)
  //   hashActi[locals.actiTypes[i].acti._id.toString()] = locals.actiTypes[i];

  models.pharmacogenetics.find({activations : {$in : actiArray}}).lean().exec(function(err, recPQxes){
    if(err)
      console.log("gv7t76g8yby6tf76h89u9 : " + err);
    if(!recPQxes)
      recPQxes = [];
    for(var i = 0; i < recPQxes.length; i++){
      var cumulCount = 0;
      recPQxes[i].actiTypes = [];
      for(var j = 0; j < recPQxes[i].activations.length; j++){
        var actitype = hashActi[recPQxes[i].activations[j].toString()];
        if(actitype){
          recPQxes[i].actiTypes.push(actitype);
          if(actitype.count)// instanceof Number)
            cumulCount += actitype.count;
        }
      }
      recPQxes[i].cumulCount = cumulCount;
    }
    recPQxes.sort(function(a, b){
      return a.cumulCount < b.cumulCount;
    });
    locals.RecommendationPQx = recPQxes;

    models.nutrigenomics.find({activations : {$in : actiArray}}).lean().exec(function(err, recNQxes){
      if(err)
        console.log("gv7t76g8adasddssss89u9 : " + err);
      if(!recNQxes)
        recNQxes = [];
      for(var i = 0; i < recNQxes.length; i++){
        var cumulCount = 0;
        recNQxes[i].actiTypes = [];
        for(var j = 0; j < recNQxes[i].activations.length; j++){
          var actitype = hashActi[recNQxes[i].activations[j].toString()];
          if(actitype){
            recNQxes[i].actiTypes.push(actitype);
            if(actitype.count)// instanceof Number)
              cumulCount += actitype.count;
          }
        }
        recNQxes[i].cumulCount = cumulCount;
      }
      recNQxes.sort(function(a, b){
        return a.cumulCount < b.cumulCount;
      });

      locals.RecommendationNQx = recNQxes;

      callback(locals);
    });
  });
};

var panels              = require('./panels');
var models              = require('../models/_models'); // Loading all models

//prepare hashOfSNPs for panels
var hashOfSNPs = {};
models.genotypes.find({$and : [{snpRS : {$in : panels.PGX_PRO}}, {count : {$gt : 1}}]}).exec(function(err, documents){
  hashOfSNPs = {};
  for(var i = 0; i < documents.length; i++){
    if(!hashOfSNPs[documents[i].snpRS])
      hashOfSNPs[documents[i].snpRS] = [];
    if(documents[i].dnaSequence)
      hashOfSNPs[documents[i].snpRS].push(documents[i]);
  }
});

var actiStatic = [];
var hashActi = {};
models.actitypes.find().populate("genotypes").lean().exec(function(err, documents){
  if(err)
    console.log(err);
  actiStatic = documents;
  for(var i = 0; i < documents.length; i++){
    hashActi[documents[i]._id.toString()] = documents[i];
  }
});

var createRandomGenotypes = module.exports.createRandomGenotypes = function(callback){
  var genotypes = [];
  for(var snp in hashOfSNPs){
    var geno = hashOfSNPs[snp][Math.floor((Math.random() * hashOfSNPs[snp].length))];
    // console.log("SNPrs : " + snp + " (" + snp.length + ") : " + JSON.stringify(geno));
    if(geno){
      genotypes.push(geno);
    }
  }
  console.log("Number of Genotypes : " + genotypes.length);
  //Insert Bioinformatic calls (like phenotypes)
  getBioinformaticCalls(genotypes, function(newGenotypes){
    console.log("Number of Genotypes with bioinformatic calls: " + newGenotypes.length);
    callback(newGenotypes);
  });
}

var createRandomPatient = module.exports.createRandomPatient = function(info, callback){
  var patient = new models.patients({name : info.name, birthday : info.birthday, gender : info.gender});
  createRandomGenotypes(function(newGenotypes){
    patient.genotypes = newGenotypes;

    computeRecommendations(patient, function(locals){
      patient.nutrigenomics = locals.RecommendationNQx;
      patient.pharmacogenetics = locals.RecommendationPQx;

      console.log("Patient to be saved : " + patient.name + "(" + patient.genotypes.length + " - " + patient.pharmacogenetics.length + "-" + patient.nutrigenomics.length);
      patient.save(function(err, document){
        if(err)
          console.log("Could not save patient : " + err);
        console.log("Patient saved : " + document.name);
        callback(patient);
      });
    });
  });
}
