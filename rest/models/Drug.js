const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const DrugSchema = mongoose.Schema({
  drugId: 	{ type: String, required: true, initial:true },
  commercialNames: { type: String, required: false, initial:true },
  drugName:	{ type: String, required: false, initial:true },
  label_fr:	{ type: String, required: false, initial:true },
  relatedGenes: [{ type: Types.ObjectId, ref: 'Gene', required: false, initial:true, many: true}],
  premiseClient: { type: String, wysiwyg:true, required: false , initial:false, html:true},
  premiseClinician: { type: String, wysiwyg:true, required: false , initial:false, html: true}
});

module.exports = mongoose.model('Drug', DrugSchema);
