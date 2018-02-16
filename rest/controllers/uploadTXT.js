var express = require('express');

//Generic controller, routing to a model
var createRouter = function(models, writable){
  var router = express.Router();
  var theModels = models;

  // Create a new item
  router.post('/',(req,res) => {
    var document = new theModel();      // create a new instance of the model
    updateAndSave(req, res, document, view);
  });

  return router;
}

module.exports = {createRouter : createRouter};
