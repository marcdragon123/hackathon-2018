const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const PhenotypeSchema = mongoose.Schema({
  code_en: { type: String, required: true, initial:true },
  code: { type: String, required: false, initial:true },
  shortCode: { type: String, required: false, initial:true },
  texte	: { type: String, required: false, initial:true },
  texte_en	: { type: String, required: false, initial:true },
  texte_fr_client	: { type: String, required: false, initial:true },
  texte_en_client	: { type: String, required: false, initial:true },
  activityScore: { type: Number, required: false, initial:true },
  notes: { type: String, required: false, initial:true }
});

module.exports = mongoose.model('Phenotype', PhenotypeSchema);
