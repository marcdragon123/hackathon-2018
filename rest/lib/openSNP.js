var request           = require('request');
var models            = require('../models/_models');

const url_openSNP = 'http://opensnp.org/snps/json/annotation/';

module.exports.addSNP = function(rsSNP, callback1){
  console.log("Fetching info from openSNP...");
  var callback = callback1;
  request.get({
      url: url_openSNP + rsSNP + ".json",
      json: true,
      headers: {'User-Agent': 'request'}
    }, (err, res, data) => {
      if (err) {
        console.log('Error:', err);
      } else if (res.statusCode !== 200) {
        console.log('Status:', res.statusCode);
      } else {
        // data is already parsed as JSON:
        data = data.snp;
        if(data){
          console.log("SNP to insert : " + data.name);
          data["ID"] = rsSNP;
          data["snpRS"] = rsSNP;
          var document = new models["polymorphism"](data);
          // document.ID = rsSNP;
          // document.snpRS = rsSNP;
          // var toUpdate = {};
          // for(var property in req.body){
          //   toUpdate[property] = req.body[property];
          // }

          // save the new document and check for errors
          document.save(function(err, saveD) {
            callback(err, saveD);
          });
        }
        else{
          callback("Missing snp in data", {});
        }
        // document.update({_id : document._id}, {$set: data}, {strict : false}, function(err, result) {
        //   callback(err, document);
        // });
      }
  });
};
