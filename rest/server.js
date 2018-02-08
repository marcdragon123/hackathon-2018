var express     = require('express');
var bodyParser  = require('body-parser');

var app         = express(); // Please do not remove this line, since CLI uses this line as guidance to import new controllers
var mongoose    = require('mongoose');
mongoose.connect("mongodb://localhost:27017/hackathon2018"); // connect to our database

var models              = require('./models/_models'); // Loading all models
var genericControllers  = require('./controllers/_generic'); // A tool to automate routes for each model

const writable = true;

console.log("------ Hackathon 2018 ------");
console.log("Launch sequence initiated .... ");

console.log("Throwing in some middlewares .... ");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.set('json spaces', 2);

for(var model in models){
  console.log("Registering model : " + model);
  genericControllers.create(app, model, models[model], writable);
}

console.log("Adding custom controller .... ");
app.use('/', require('./controllers/homeController'));


//Lets launch the service!
app.listen(process.env.PORT || 5000, () => {
  console.log('------ Server is running on port 5000! ------');
});
