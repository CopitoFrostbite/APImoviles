const mongoose = require('mongoose');

const reminderSchema = new mongoose.Schema({
  reminderId: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  date: {
    type: Date,
    required: true
  },
  time: {
    type: String,
    required: true
  }
});

const Reminder = mongoose.model('reminder', reminderSchema);

module.exports = Reminder;
