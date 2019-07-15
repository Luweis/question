"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
exports.AnswerSchema = new mongoose.Schema({
    title: String,
    value: Number
});
