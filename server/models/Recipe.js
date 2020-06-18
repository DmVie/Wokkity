const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field is required.'],
    trim: true
  },
  shortDesc: {
    type: String,
    trim: true
  },
  description: {
    type: String,
    trim: true
  },
  img: {
    type: String
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  ingredients: [{
    ingredient
  }],
  method: {
    type: String,
    trim: true
  }
},{ timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;
