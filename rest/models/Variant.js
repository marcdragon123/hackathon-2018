const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const VariantSchema = mongoose.Schema({
  name: String,
  gene: { type: Types.ObjectId, ref: 'GeneModel' },//gene information also present in phenotype
  phenotype: { type: Types.ObjectId, ref: 'PhenotypeModel' },
  diplotype: { type: Types.ObjectId, ref: 'DiplotypeModel' },
  polymorphism: { type: Types.ObjectId, ref: 'PolymorphismModel' },
  reads: String,
  count: Number
});

module.exports = mongoose.model('VariantModel', VariantSchema);
