const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Create Schema
const TrackerSchema = new Schema({
  litres: {
    type: Number,
    required: true
  },
  amount: {
    type: Number,
    required: true
  },
  endkm: {
    type: Number,
    required: true
  },
  date: {
    type: Date,
    default: Date.now
  }
});

mongoose.model('tracker', TrackerSchema);
