const mongoose = require('mongoose');

const replySchema = new mongoose.Schema({
  name: {
    type: String,
  },
  body: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

replySchema.set('toObject', {virtuals: true});
replySchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Reply', replySchema);