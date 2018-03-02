const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const TriggerSchema = mongoose.Schema({
  code: { type: String, required: false, initial: false },
  inputGenotypes: [{ type: Types.ObjectId, ref: 'Genotype', required: false, initial:true, many:true }],
  // inputStats: [{ type: Types.ObjectId, ref: 'Stats', required: false, initial:true, many:true, unique:true }],
  // outputRecommendationsPGx: [{ type: Types.ObjectId, ref:'RecommendationPQx', required: false, initial:true, many:true }],
  // outputRecommendationsNGx: [{ type: Types.ObjectId, ref:'RecommendationNQx', required: false, initial:true, many:true }],
  outputGenotypes: [{ type: Types.ObjectId, ref: 'Genotype', required: false, initial:true, many:true}],
  count: { type: Number, required: false, initial:false, default: 0 },
  isApproved: { type: Boolean, required: false, initial:true, noedit:true },
},{
  strict: false,
  strictQuery: false // Turn on strict mode for query filters
});

module.exports = mongoose.model('Trigger', TriggerSchema);
