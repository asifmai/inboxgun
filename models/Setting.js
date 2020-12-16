const mongoose = require('mongoose');

const settingSchema = new mongoose.Schema({
  service: {
    type: String,
  },
  host: {
    type: String,
  },
  port: {
    type: String,
  },
  userName: {
    type: String,
  },
  password: {
    type: String,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

settingSchema.set('toObject', {virtuals: true});
settingSchema.set('toJSON', {virtuals: true});

module.exports = mongoose.model('Setting', settingSchema);