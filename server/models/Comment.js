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
  text: {
    type: String,
    trim: true
  }
})


const Comment = mongoose.model('Comment', commentSchema)