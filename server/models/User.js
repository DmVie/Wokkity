const mongoose = require('mongoose');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, 'Name is required'],
    trim: true,
    minlength: [3, 'Names must be a minimum of 3 characters in length']
  },
  email: {
    type: String,
    required: [true, 'An email address is required'],
    trim: true,
    unique: true,
    validate(value) {
      if(!validator.isEmail(value)) {
        throw new Error('Invalid email address, please check and try again')
      }
    },
  },
  password: {
    type: String,
    required: [true, 'Password is a required field'],
    minlength: [5, 'Passwords need to be a minimum of 5 characters in length'],
    tokens: [{
      token: {
        type: String,
        required: true
      }
    }]
  },
  avatar: {
    type: String
  }
}, {timestamps: true})

const User = mongoose.model('User', userSchema);

module.exports = User;