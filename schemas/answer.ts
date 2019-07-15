import  *as mongoose  from 'mongoose';

export const AnswerSchema = new mongoose.Schema({
  title: String,
  value: Number
});
