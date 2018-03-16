var express = require('express');

const createFilterFromParam = function(req, res){

  var filters = [];
  for(var property in req.query){
    if(property && req.query[property]){
      var newFilter = {};
      if(req.query[property].length == 24)
        newFilter[property] = req.query[property];//Exact match or array contains
      else
        newFilter[property] = { "$regex": req.query[property], "$options": "i" };//contains
      // newFilter[property] = req.query[property];
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

const createPopulates = function(schema, view){
  var populates = [];
  if(view == "html" && schema["obj"]){
    for(var property in schema["obj"]){
      if(schema["obj"][property] && schema["obj"][property].ref)
        populates.push(property);
    }
  }
  return populates;
}

//Generic controller, routing to a model
var createRouter = function(modelName, model, writable, viewMode){
  var router = express.Router();
  var theModel = model;
  var theModelName = modelName;
  var view = viewMode;
  var limit = (view == "html" ? 100 : null);

  var sendResponse = function(req, res, name, document, view, template){
    switch(view){
      case "html":
        res.render(template, {json : document, name : name, schema : theModel.schema });
        break;
      case "json":
        res.setHeader('Content-disposition', 'attachment; filename=' + name +'.json');
        res.setHeader('Content-type', 'application/json');
        res.json(document);
        break;
      case "csv":
        res.setHeader('Content-disposition', 'attachment; filename=' + name +'.csv');
        res.setHeader('Content-type', 'application/csv');
        res.csv(document, true);
        break;
      }
  }

  //Generic function used both to create or update document
  var updateAndSave = function(req, res, name, document, view, template){
    //cycle through body content to add properties
    var toUpdate = {};
    for(var property in req.body){
      toUpdate[property] = req.body[property];
    }

    // save the new document and check for errors
    theModel.update({_id : document._id}, {$set: toUpdate}, {strict : false}, function(err) {
      if (err)
        res.send(err);
      else{
        sendResponse(req, res, name, toUpdate, view, template);
      }
    });
  }


  //List all documents
  router.get("/",    (req,res) => {
    var filters = createFilterFromParam(req, res);
    var populates = createPopulates(theModel.schema, view);
    //.select(Object.keys(theModel.schema.paths)).
    theModel.find(filters).limit(limit).populate(populates).lean().exec(function(err, documents) {
      if (err)
        res.send(err);
      else
        sendResponse(req, res, theModelName, documents, view, 'table');
    });
  });

  // Fetch specific document
  router.get('/:_id', (req,res) => {
    var populates = createPopulates(theModel.schema, view);
    theModel.findById(req.params._id).populate(populates).lean().exec(function(err, document) {
      if (err)
        res.send(err);
      else
        sendResponse(req, res, theModelName, document, view, 'json');
    });
  });

  // Fetch specific document and return a specific property
  router.get('/:_id/:_property', (req,res) => {
    var populates = createPopulates(theModel.schema, view);
    theModel.findById(req.params._id).populate(populates).select(req.params._property).lean().exec(function(err, document) {
      if (err)
        res.send(err);
      else{
        if(document && req.params._property)
          sendResponse(req, res, theModelName, document[req.params._property], view, 'property');
        else
          sendResponse(req, res, theModelName, {}, view, 'property');
      }
    });
  });

  if(writable){
    // Create a new item
    router.post('/',(req,res) => {
      var document = new theModel();      // create a new instance of the model
      updateAndSave(req, res, theModelName, document, view, 'property');
    });


    // Update an item
    router.put('/:_id',(req,res) => {
      theModel.findById(req.params._id, function(err, document) {
        if (err)
          res.send(err);

        updateAndSave(req, res, theModelName, document, view, 'json');
      });
    });

    // Update multiple items
    router.put('/',(req,res) => {
      var filters = createFilterFromParam(req, res);
      theModel.update(filters, { $set: createUpdaterFromBody(req, res)}, {multi: true}, function(err, documents) {
        if (err)
          res.send(err);
        else
          sendResponse(req, res, theModelName, documents, view, 'table');
      });
    });

    // Delete an item
    router.delete('/:_id',(req,res) => {
      theModel.findByIdAndRemove(req.params._id, function(err) {
        if (err)
          res.send(err);

        updateAndSave(req, res, theModelName, {message : "Document removed!"}, view, 'json');
      });
    });
  }
  return router;
}

module.exports = {createRouter : createRouter};
