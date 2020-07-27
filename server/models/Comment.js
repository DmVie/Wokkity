const mongoose = require('mongoose');


const commentSchema = new mongoose.Schema({
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
    required: true
  },
  recipe: {
    type: mongoose.Types.ObjectId,
    ref: 'Recipe',
    required: true
  },
  posted: {
    type: Date,
    default: Date.now,
    required: true
  },
  rating: {
    type: Number,
    min: 0,
    max: 5
  },
  text: {
    type: String,
    trim: true
  }
})


const Comment = mongoose.model('Comment', commentSchema)

module.exports = Comment;