const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

//gene information also present in phenotype
const PolymorphismSchema = mongoose.Schema({
  gene: { type: Types.ObjectId, ref: 'Gene', required: false, initial:true },
  snpRS: { type: String, required: false, initial:true },
  phenotype: { type: Types.ObjectId, ref: 'Phenotype', required: false, initial:true },
  diplotype: { type: Types.ObjectId, ref: 'Diplotype', required: false, initial:true },
  genotype: { type: Types.ObjectId, ref: 'Genotype', required: false, initial:true },
  mafJSON_fr:{ type: String, required: false, initial:true },
  mafJSON_en:{ type: String, required: false, initial:true },
  pcrOligoPair1_F: { type: String, required: false, initial:true },
  pcrOligoPair1_R: { type: String, required: false, initial:true },
  pcrOligoPair2_F: { type: String, required: false, initial:true },
  pcrOligoPair2_R: { type: String, required: false, initial:true },
  build: { type: String, required: false, initial:true },
  chromosome: { type: String, required: false, initial:true },
  chromosomeRef: { type: Types.ObjectId, required: false, initial:true },
  position: { type: String, required: false, initial:true },
  type: { type: String, required: false, initial:true },
  nucleotideChange: { type: String, required: false, initial:true },
  residueChange: { type: String, required: false, initial:true },
  allele: { type: String, required: false, initial:true },
  effect: { type: String, required: false, initial:true },
  MAF_1000_global: { type: String, label: 'MAF-1000 (global)', required: false, initial:true },
  MAF_1000_EUR: { type: String, label: 'MAF-1000 (EUR)', required: false, initial:true },
  MAF_1000_AFR	: { type: String, label: 'MAF-1000 (AFR)', required: false, initial:true },
  MAF_1000_AMR	: { type: String, label: 'MAF-1000 (AMR)', required: false, initial:true },
  MAF_1000_EAS	: { type: String, label: 'MAF-1000 (EAS)', required: false, initial:true },
  MAF_1000_SAS	: { type: String, label: 'MAF-1000 (SAS)', required: false, initial:true },
  MAF_HAP_CEU	: { type: String, label: 'MAF-HAP (CEU)', required: false, initial:true },
  MAF_HAP_HCB 	: { type: String, label: 'MAF-HAP  (HCB)', required: false, initial:true },
  MAF_HAP_JPT	: { type: String, label: 'MAF-HAP (JPT)', required: false, initial:true },
  MAF_HAP_YRI: { type: String, label: 'MAF-HAP (YRI)', required: false, initial:true },
	pubMedID: { type: String, required: false, initial:false },
	// snPedia: { type: , wysiwyg:true, required: false, initial:false },
  // panels: { type: Types.Relationship, ref: 'Panel', required: false, initial:true, many:true },
  notes: { type: String, required: false, initial:true },
  details: { type: String, wysiwyg:true, required: false , initial:true}
},{
  strict: false,
  strictQuery: false // Turn on strict mode for query filters
});

module.exports = mongoose.model('Polymorphism', PolymorphismSchema);
