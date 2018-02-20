const mongoose = require('mongoose');
const Types = mongoose.Schema.Types;

const DiplotypeSchema = mongoose.Schema({
    code: { type: String, required: true, initial:true },
    activityScore: { type: String, required: false, initial:true },
    notes: { type: String, required: false, initial:true }
},{
  strict: true,
  strictQuery: true // Turn on strict mode for query filters
});

module.exports = mongoose.model('Diplotype', DiplotypeSchema);
