const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const RPQxSchema = mongoose.Schema({
  code: { type: String, required: false, initial:false },
  activations:[{ type: Types.ObjectId, ref: 'ActiType', required: true, initial:true, many:true }],
  applicableSex: { type: String, options: 'Male, Female, Both', required: true, initial:true, default: 'Both'},
  notificationClient: { type: String, html:true, wysiwyg:true, required: false, initial:false },
  explicationClient: { type: String, html:true, wysiwyg:true, required: false, initial:false },
  recommendationClient: { type: String, html:true, wysiwyg:true, required: false, initial:false },
  riskNumClient: 	{ type: Types.Number, required: true, initial:true, default:1 },
  rankInsideRiskNum: 	{ type: Types.Number, required: false, initial:true, default:10 },
  // categories:{ type: Types.Relationship, ref: 'Category', required: true, initial:true, many:true },
  count: { type: Number, required: false, initial:false, default: 0 },
  drug: { type: Types.ObjectId, ref: 'Drug', required: true, initial:true },
},{
  strict: false,
  strictQuery: false // Turn on strict mode for query filters
});

module.exports = mongoose.model('RecommendationPQx', RPQxSchema);
