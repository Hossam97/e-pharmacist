const mongoose = require('mongoose');

const questionSchema = mongoose.Schema({
    question: String,
    answer: String,
    user: [{type: mongoose.Schema.ObjectId, ref: 'User'}]
})

const Question = mongoose.model('Question', questionSchema);
module.exports = Question;