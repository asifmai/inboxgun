const mongoose = require('mongoose');

const logSchema = new mongoose.Schema({
  campaign: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Campaign',
  },
  success: Number,
  failure: Number,
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

logSchema.set('toObject', {virtuals: true});
logSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Log', logSchema);