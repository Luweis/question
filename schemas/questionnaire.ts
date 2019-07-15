import *as mongoose from 'mongoose';

//用户的表结构
module.exports = new mongoose.Schema({
  title: String,
  questions: {
    type: mongoose.SchemaTypes.Array,
    ref: 'Question'
  }
});
