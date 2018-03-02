const unsetPropertiesForModel = function(model, callback){
  //get first 100 items
  model.find().limit(100).lean().exec(function(err, documents){
    var hashProperties = {};
    var schemaKeys = Object.keys(model.schema.paths);
    console.log("schemaKeys = " + schemaKeys);

    //list properties that are not in Schema
    for(var i = 0; i < documents.length; i++){
      for(var prop in documents[i]){
        if(schemaKeys.indexOf(prop) < 0 && !hashProperties[prop]){
          console.log("prop = " + prop);
          hashProperties[prop] = 1;
        }
      }
    }
    console.log("hashProperties = " + JSON.stringify(hashProperties));
    //update $unset said properties in entire collection
    model.update({}, {$unset: hashProperties}, {multi: true, strict: false}).exec(function(err){
      callback(err);
    });
  });
};

module.exports.unsetPropertiesForModel = unsetPropertiesForModel;
