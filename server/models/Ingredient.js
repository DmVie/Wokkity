const mongoose = require('mongoose');

const ingredientSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Each ingredient must have a name'],
    unique: [true, 'That name has already been given to an ingredient'],
  },
  description: {
    type: String,
    trim: true
  }
})

const Ingredient = mongoose.model(ingredientSchema);

module.exports = Ingredient;