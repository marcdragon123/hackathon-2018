const mongoose = require('mongoose');

const GeneSchema = mongoose.Schema({
  name: String,
  count: Number,
  fr:{
    label : String,
    description : String
  },
  en:{
    label : String,
    description : String
  },
});

module.exports = mongoose.model('GeneModel', GeneSchema);
