const mongoose = require('mongoose');

const GeneSchema = mongoose.Schema({
  name: String,
  count: Number
});

module.exports = mongoose.model('GeneModel', GeneSchema);
