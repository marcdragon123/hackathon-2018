const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const VariantSchema = mongoose.Schema({
  code: { type: String, noedit: true, initial: false },
  gene: { type: Types.ObjectId, ref: 'Gene', required: false, initial:true },
  phenotype: { type: Types.ObjectId, ref: 'Phenotype', required: false, initial:true },
  diplotype: { type: Types.ObjectId, ref: 'Diplotype', required: false, initial:true },
  polymorphism: [{type: Types.ObjectId, ref: 'Polymorphism', required: false, initial:false, many:true }],
  geneID: { type: String, required: false, initial: false },
  phenoCode: { type: String, required: false, initial: false },
  phenoCodeEffective: { type: String, required: false, initial: false },
  diploCode: { type: String, required: false, initial: false },
  activityScore: { type: String, required: false, initial:true },
  snpRS: { type: String, required: false, initial:true },
  dnaSequence: { type: String, required: false, initial:true },
  dnaSequenceReported: { type: String, required: false, initial:true },
  notes: { type: String, required: false, initial:true },
  count: { type: Number, required: false, initial:false, default: 0 },
  isFailed:{ type: Boolean, required: false, initial:true},
  isLabSpecific:{ type: Boolean, required: false, initial:true}
},{
  strict: true,
  strictQuery: true // Turn on strict mode for query filters
});

module.exports = mongoose.model('Genotype', VariantSchema);
