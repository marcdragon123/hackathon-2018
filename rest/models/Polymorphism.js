const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

//gene information also present in phenotype
const PolymorphismSchema = mongoose.Schema({
  name: String,
  gene: { type: Types.ObjectId, ref: 'GeneModel' },
  phenotype: { type: Types.ObjectId, ref: 'PhenotypeModel' },
  diplotype: { type: Types.ObjectId, ref: 'DiplotypeModel' },
  count: Number
});

module.exports = mongoose.model('PolymorphismModel', PolymorphismSchema);
