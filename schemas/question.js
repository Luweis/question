const mongoose = require('mongoose');

const Question = mongoose.Schema({
  title: {
    type: String,
    index: {
      unique: true
    }
  },
  type: {
    type: Number,
    default: 0
  },
  answers: []
});

module.exports = Question;
