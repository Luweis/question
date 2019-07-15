"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
//用户的表结构
module.exports = new mongoose.Schema({
    title: String,
    questions: {
        type: mongoose.SchemaTypes.Array,
        ref: 'Question'
    }
});
