var express = require('express');

//Generic function used both to create or update document
const updateAndSave = function(req, res, document){
  //cycle through body content to add properties
  for(var property in req.body){
    console.log("Property : " + property + "(" + req.body[property] + ")");
    document[property] = req.body[property];
  }

  // save the new document and check for errors
  document.save(function(err) {
    if (err)
      res.send(err);

    res.json(
      { message: "OK",
        document: document
      });
  });
}

//Generic controller, routing to a model
var create = function(app, name, model, writable){
  var router = express.Router();
  var theName = name;
  var theModel = model;

  //List all documents
  router.get("/",    (req,res) => {
    theModel.find(function(err, documents) {
      if (err)
        res.send(err);
      else
        res.json(documents);
    });
  });

  // Fetch specific document
  router.get('/:_id', (req,res) => {
    theModel.findById(req.params._id, function(err, document) {
      if (err)
        res.send(err);
      else
        res.json(document);
    });
  });

  if(writable){
    // Create a new item
    router.post('/',(req,res) => {
      var document = new theModel();      // create a new instance of the model
      updateAndSave(req, res, document);
    });


    // Update an item
    router.put('/:_id',(req,res) => {
      theModel.findById(req.params._id, function(err, document) {
        if (err)
          res.send(err);

        updateAndSave(req, res, document);
      });
    });
  }
    //Register routes
  app.use("/"+name+"/", router);
}

module.exports = {create : create};
