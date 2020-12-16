const mongoose = require('mongoose');

const campaignSchema = new mongoose.Schema({
  name: String,
  numberOfEmails: Number,
  replyTo: String, // Email
  replies: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reply',
  }],
  server: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Setting',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

campaignSchema.set('toObject', {virtuals: true});
campaignSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Campaign', campaignSchema);