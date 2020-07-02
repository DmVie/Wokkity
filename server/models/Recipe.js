const mongoose = require('mongoose');

const recipeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Title field is required.'],
    trim: true
  },
  shortDesc: {
    type: String,
    trim: true,
    required: [true, 'A Short Description of the recipe is required']
  },
  desc: {
    type: String,
    trim: true
  },
  bannerImg: {
    med: {
      type: String
    },
    large: {
      type: String
    }
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  ingredients: [{
    name: {
      type: String,
      amount: String,
      required: [true, 'Recipes need ingredients!']
    },
    amount: {
      type: String,
      required: [true, 'Please provide the amount of ingredient']
    }
  }],
  preparation: [String],
  method: [String],
  notes: [String],
  imgs: [{
    name: {
      type: String, 
      required: [true, 'Images must have a name'],
      trim: true
    },
    square: {
      type: String
    },
    med: {
      type: String
    } 
  }]
},{ timestamps: true})

const Recipe = mongoose.model('Recipe', recipeSchema)

module.exports = Recipe;
