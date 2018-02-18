const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const ActiTypeSchema = mongoose.Schema({
  code: { type: String, required: false, initial: false },
  genotypes:[{ type: Types.ObjectId, ref: 'Genotype', required: false, initial:true, many:true }],
  reverse: { type: Boolean, label: 'Reverse : Triggered by absence of any of those genotypes', default:false },
  formula: { type: String, required: false, initial:true },
  texte	: { type: String, required: false, initial:true },
  count: { type: Number, required: false, initial:false, default: 0 }
});

module.exports = mongoose.model('ActiType', ActiTypeSchema);
