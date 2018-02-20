const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const NutrimentSchema = mongoose.Schema({
  nutrimentId: 	{ type: String, required: false, initial:true },
  nutrimentName:	{ type: String, required: true, initial:true },
  relatedGenes: [{ type: Types.ObjectId, ref: 'Gene', required: false, initial:true, many: true}],
  nutrimentAboutTitle_fr: { type: String, required: false, initial:true },
  about: { type: String, html:true, wysiwyg:true, required: false , initial:true},
  nutrimentGeneticsAboutTitle_fr: { type: String, required: false, initial:true },
  geneticsAbout: { type: String, html:true, wysiwyg:true, required: false , initial:true},
  titleLine: { type: String, required: false, initial:true },
  label: { type: String, required: false, initial:true },
  tagLine: { type: String, required: false, initial:true },
  premiseClient: { type: String, html:true, wysiwyg:true, required: false , initial:true}
},{
  strict: true,
  strictQuery: true // Turn on strict mode for query filters
});

module.exports = mongoose.model('Nutriment', NutrimentSchema);
