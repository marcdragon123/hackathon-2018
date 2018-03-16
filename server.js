var express     = require('express');
var csv         = require('csv-express')
var cors        = require('cors');
var bodyParser  = require('body-parser');

var app         = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers
app.use(cors());

var mongoose    = require('mongoose');
var args = "bonqoeur";
process.argv.forEach(function (val, index, array) {
  if(index == 2)
    args = val;
});
console.log("Connecting to database : " + args);
mongoose.connect("mongodb://localhost:27017/"+args); // connect to our database hackathon2018

var models              = require('./rest/models/_models'); // Loading all models
var genericControllers  = require('./rest/controllers/_generic'); // A tool to automate routes for each model

const writable = true;

console.log("------ Hackathon 2018 ------");
console.log("Launch sequence initiated .... ");

console.log("Throwing in some middlewares .... ");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('json spaces', 2);

var displayedModels = {
  patients : true,
  genes : true,
  phenotypes : true,
  diplotypes : true,
  genotypes : true,
  polymorphisms : true,
  activations : true,
  bioinformatics : true,
  drugs : true,
  nutriments : true,
  pharmacogenetics : true,
  nutrigenomics : true
};

for(var model in models){
  if(displayedModels[model])
    displayedModels[model] = models[model];
  console.log("Registering model : " + model); //Register routes
  app.use("/json/"+model+"/", genericControllers.createRouter(model, models[model], writable, "json"));
  app.use("/csv/"+model+"/", genericControllers.createRouter(model, models[model], writable, "csv"));
  app.use("/html/"+model+"/", genericControllers.createRouter(model, models[model], writable, "html"));
}

console.log("Adding template engine .... ");
app.set('view engine', 'pug')
console.log("Adding custom controller .... ");
app.use('/', require('./rest/controllers/home').create(displayedModels, writable));
if(writable){
  app.use('/admin/remove/properties/', require('./rest/controllers/propertyRemoval').create(displayedModels));

  //Ajoute un SNP dans la base de donnée à partir de OpenSNP.org
  app.use('/admin/add/polymorphism/', require('./rest/controllers/snpInsertion').create(displayedModels));

  // Ajouter les GENOTYPES (aléatoirement) correspondant à de nouveaux polymorphismes (dans panel.js)
  // var genotyper = require("./rest/lib/genotypes_fromSNPs");
  // genotyper.AddMissingGenotypes();

  // Ajouter la liste des phenotypes, provenance de OpenSNP.org
  // var phenoJson = require("./rest/lib/phenotypes");
  // phenoJson.saveAllPhenotypes(function(){
  //   console.log("All phenotypes saved");
  // })
}
//Lets launch the service!
app.listen(process.env.PORT || 5000, () => {
  console.log('------ Server is running on port 5000! ------');
});
