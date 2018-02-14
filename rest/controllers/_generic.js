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

const createFilterFromParam = function(req, res){

  var filters = [];
  for(var property in req.query){
    if(property && req.query[property]){
      var newFilter = {};
      newFilter[property] = req.query[property];
      filters.push(newFilter);
    }
  }
  if(filters.length > 0)
    filters = {$and : filters};
  else
    filters = {};
    return filters;
}

const createUpdaterFromBody = function(req, res){
  var updater = {};
  for(var property in req.body){
    updater[property] = req.body[property];
  }
  return updater;
}

//Generic controller, routing to a model
var create = function(app, name, model, writable){
  var router = express.Router();
  var theName = name;
  var theModel = model;

  //List all documents
  router.get("/",    (req,res) => {
    var filters = createFilterFromParam(req, res);
    theModel.find(filters).lean().exec(function(err, documents) {
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

    // Update multiple items
    router.put('/',(req,res) => {
      var filters = createFilterFromParam(req, res);
      theModel.update(filters, { $set: createUpdaterFromBody(req, res)}, {multi: true}, function(err, documents) {
        if (err)
          res.send(err);
        else
          res.json(documents);
      });
    });
  }
    //Register routes
  app.use("/"+name+"/", router);
}

module.exports = {create : create};
