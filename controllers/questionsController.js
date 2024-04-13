const mongoose = require("mongoose");
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
} = require("./queriesHandler");
const Question = require("../models/questionModel");
const User = require("../models/userModel");
const { promisify } = require('util');
const jwt = require('jsonwebtoken');

exports.getAllQuestions = getAll(Question);
exports.getQuestion = getOne(Question);
exports.addQuestion = createOne(Question);
exports.updateQuestion = updateOne(Question);
exports.deleteQuestion = deleteOne(Question);
