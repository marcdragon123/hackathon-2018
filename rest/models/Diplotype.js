const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const DiplotypeSchema = mongoose.Schema({
  name: String,
  gene: { type: Types.ObjectId, ref: 'GeneModel' },//gene information also present in phenotype
  phenotype: { type: Types.ObjectId, ref: 'PhenotypeModel' },
  count: Number
});

module.exports = mongoose.model('DiplotypeModel', DiplotypeSchema);
