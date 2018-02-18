var express     = require('express');
var cors        = require('cors');
var bodyParser  = require('body-parser');

var app         = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers
app.use(cors());

var mongoose    = require('mongoose');
mongoose.connect("mongodb://localhost:27017/bonqoeur"); // connect to our database hackathon2018

var models              = require('./rest/models/_models'); // Loading all models
var genericControllers  = require('./rest/controllers/_generic'); // A tool to automate routes for each model

const writable = true;

console.log("------ Hackathon 2018 ------");
console.log("Launch sequence initiated .... ");

console.log("Throwing in some middlewares .... ");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('json spaces', 2);

for(var model in models){
  console.log("Registering model : " + model); //Register routes
  app.use("/json/"+model+"/", genericControllers.createRouter(model, models[model], writable, false));
  app.use("/html/"+model+"/", genericControllers.createRouter(model, models[model], writable, true));
}

console.log("Adding template engine .... ");
app.set('view engine', 'pug')
console.log("Adding custom controller .... ");
app.use('/', require('./rest/controllers/home').create(models));


//Lets launch the service!
app.listen(process.env.PORT || 5000, () => {
  console.log('------ Server is running on port 5000! ------');
});
