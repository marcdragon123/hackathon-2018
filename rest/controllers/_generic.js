var express = require('express');

//Generic function used both to create or update document
const updateAndSave = function(req, res, name, document, view){
  //cycle through body content to add properties
  for(var property in req.body){
    // console.log("Property : " + property + "(" + req.body[property] + ")");
    document[property] = req.body[property];
  }

  // save the new document and check for errors
  document.save(function(err) {
    if (err)
      res.send(err);
    if(view)
      res.render('json', {json : { message: "OK", document: document }, name : name, schema : {}});
    else
      res.json(document);
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

const createPopulates = function(schema){
  var populates = [];
  // if(schema["obj"]){
  //   for(var property in schema["obj"]){
  //     if(schema["obj"][property] && schema["obj"][property].ref)
  //       populates.push(property);
  //   }
  // }
  return populates;
}

//Generic controller, routing to a model
var createRouter = function(modelName, model, writable, viewMode){
  var router = express.Router();
  var theModel = model;
  var theModelName = modelName;
  var view = viewMode;
  var limit = (view ? 20 : null);

  var sendResponse = function(req, res, name, document, view){
    if(view)
      res.render('json', {json : document, name : name, schema : theModel.schema});
    else
      res.json(document);
  }

  //List all documents
  router.get("/",    (req,res) => {
    console.log("GET : " + theModelName);
    var filters = createFilterFromParam(req, res);
    var populates = [];//createPopulates(theModel.schema);
    theModel.find(filters).limit(limit).populate(populates).select(Object.keys(theModel.schema.paths)).lean().exec(function(err, documents) {
      if (err)
        res.send(err);
      else
        sendResponse(req, res, theModelName, documents, view);
    });
  });

  // Fetch specific document
  router.get('/:_id', (req,res) => {
    var populates = createPopulates(theModel.schema);
    theModel.findById(req.params._id).populate(populates).select(Object.keys(theModel.schema.paths)).lean().exec(function(err, document) {
      if (err)
        res.send(err);
      else
        sendResponse(req, res, theModelName, document, view);
    });
  });

  // Fetch specific document and return a specific property
  router.get('/:_id/:_property', (req,res) => {
    var populates = createPopulates(theModel.schema);
    theModel.findById(req.params._id).populate(populates).select(Object.keys(theModel.schema.paths)).lean().exec(function(err, document) {
      if (err)
        res.send(err);
      else{
        if(document && req.params._property)
          sendResponse(req, res, theModelName, document[req.params._property], view);
        else
          sendResponse(req, res, theModelName, {}, view);
      }
    });
  });

  if(writable){
    // Create a new item
    router.post('/',(req,res) => {
      var document = new theModel();      // create a new instance of the model
      updateAndSave(req, res, theModelName, document, view);
    });


    // Update an item
    router.put('/:_id',(req,res) => {
      theModel.findById(req.params._id, function(err, document) {
        if (err)
          res.send(err);

        updateAndSave(req, res, theModelName, document, view);
      });
    });

    // Update multiple items
    router.put('/',(req,res) => {
      var filters = createFilterFromParam(req, res);
      theModel.update(filters, { $set: createUpdaterFromBody(req, res)}, {multi: true}, function(err, documents) {
        if (err)
          res.send(err);
        else
          sendResponse(req, res, theModelName, documents, view);
      });
    });
  }
  return router;
}

module.exports = {createRouter : createRouter};
