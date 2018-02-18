const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const PatientSchema = mongoose.Schema({
  name: { type: String, noedit: true, initial: false },
  birthday: { type: String, required: false, initial:false, noedit:true},
  gender: { type: String, required: false, initial:true},
  genotypes: [{ type: Types.ObjectId, ref: 'Genotype', required: false, initial:true }],
  nutrigenomics: [{ type: Types.ObjectId, ref: 'RecommendationNQx', required: false, initial:true }],
  pharmacogenetics: [{ type: Types.ObjectId, ref: 'RecommendationPQx', required: false, initial:true }],
});

module.exports = mongoose.model('Patient', PatientSchema);
