const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const GeneSchema = mongoose.Schema({
  geneId: { type: String, required: true, initial:true },
  description: { type: String, required: false, initial:false },
  description_en: { type: String, required: false, initial:false },
  phenotypes: [{ type: Types.ObjectId, ref: 'Phenotype', required: false, initial:true, many:true }],
  SNPs: [{type: String, required: false, initial:false}],
  mafJSON_fr:{ type: String, required: false, initial:true },
  mafJSON_en:{ type: String, required: false, initial:true },
  notes: { type: String, required: false, initial:true }
},{
  strict: false,
  strictQuery: false // Turn on strict mode for query filters
});

module.exports = mongoose.model('Gene', GeneSchema);
