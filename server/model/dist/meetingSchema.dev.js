"use strict";

var mongoose = require('mongoose');

var jwt = require('jsonwebtoken');

var meetingSchema = new mongoose.Schema({
  sender: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true
  },
  currentdate: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  restaurant: {
    type: String,
    required: true
  },
  status: {
    type: String,
    required: true
  },
  condition: {
    type: String,
    required: true
  }
});
var Schedule = mongoose.model('MEETING', meetingSchema);
module.exports = Schedule;