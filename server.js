require('dotenv').load();
var express     = require('express');
var csv         = require('csv-express')
var cors        = require('cors');
var logger      = require('morgan');
var bodyParser  = require('body-parser');

var app         = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers
app.use(cors());
app.use(logger('[:date[iso]] :method :url :status :response-time ms - :res[content-length]'));

var mongoose    = require('mongoose');
var args = "bonqoeur";
process.argv.forEach(function (val, index, array) {
  if(index == 2)
    args = val;
});
console.log("Connecting to database : " + args);
mongoose.connect("mongodb://localhost:" + (process.env.DB_PORT || "27017") + "/" + args); // connect to our database hackathon2018

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

var modelsInformation = {
  patients : "Modèle qui contient les informations et charactéristiques(phenotypes) du patient. Contient aussi tous ses résultats(genotypes) génétiques ainsi que les recommendations associées(pharmacogenetics/nutrigenomics).",
  genes : "Modèle qui représente l'information structurelle d'un gène. Entre autre, tous les nucléotides associées (SNPs) ainsi que tous les phenotypes connus qui y sont attachés. De plus, des informations de statistiques de population sont données via 'mafJSON'.",
  phenotypes : "Modèle qui représente une charactéristique tangible et visible reliée à la mutation ou non d'un ou de plusieurs gènes",
  diplotypes : "Modèle qui représente la nomenclature scientifique de la mutation ou non d'un gène.",
  genotypes : "Modèle qui représente les résultats bruts du patient pour chaque nucléotides ciblé. De plus, ce modèle agglomère aussi les résultats bioinformatiques finaux (couple phenotype / gène / dyplotype)",
  polymorphisms : "Modèle qui représente les variants d'un gène en fonction des SNPs et de leurs notations scientifiques(dyplotype)",
  activations : "Modèle qui représente le regroupement de génotypes finaux qui seront éventuellement transformer en recommendations(pharmacogenetics/nutrigenomics)",
  bioinformatics : "Modèle qui représente les couples génotypes initiaux -> génotypes finaux. Ce modèle est la représentation formelle du phenotypage.",
  drugs : "Modèle qui représente les médicaments qui seront utilisés par les recommendations pharmacogénétiques.",
  nutriments : "Modèle qui représente les médicaments qui seront utilisés par les recommendations nutrigénomiques.",
  pharmacogenetics : "Modèle qui représente les différentes recommendations possibles pour un médicament spécifique.",
  nutrigenomics : "Modèle qui représente les différentes recommendations possibles pour un nutriment spécifique."
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
