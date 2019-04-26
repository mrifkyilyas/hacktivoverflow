const mongoose = require('mongoose')
const Schema = mongoose.Schema
const {bcrypt} = require('../helpers/')

const QuestionSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
      },
      description: {
        type: String,
        required: [true, 'Description is required'],
        minlength: [3, 'Description is too short'],
      },
      upvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      downvotes: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
      }],
      answers: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Answer',
      }],
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: [true, 'User is required'],
      },
      createdAt: {
        type: Date,
        default: new Date(),
      },
})


const Question = mongoose.model('Question', QuestionSchema)
module.exports = Question