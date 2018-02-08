const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const PhenotypeSchema = mongoose.Schema({
  name: String,
  gene: { type: Types.ObjectId, ref: 'GeneModel' },
  count: Number
});

module.exports = mongoose.model('PhenotypeModel', PhenotypeSchema);
