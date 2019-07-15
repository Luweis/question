const mongoose = require('mongoose');

module.exports = mongoose.Schema({
  user:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'User'
  },
  question:{
    type: mongoose.SchemaTypes.ObjectId,
    ref: 'Question'
  },
  answers: {

  }
});
