const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const validator = require('validator');

const userSchema = new mongoose.Schema({
  thirdPartyUid: {
    type: String,
    required: true,
    unique: true
  },
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
  tokens: [{
    token: {
      type: String,
      required: true,
    }
  }],
  avatar: {
    type: String
  }
}, {timestamps: true})

userSchema.methods.toJSON = function () {

  const userObject = this.toObject()

  delete userObject.password;
  delete userObject.tokens;
  delete userObject.thirdPartyUid;
  delete userObject.__v;
  delete userObject._id;
  
  return userObject
}

userSchema.statics.findByCredentials = async function(id, email) {
  // searh or user 
  try {
     return User.findOne({thirdPartyUid: id, email});    
  } catch (e) {
    throw new Error(e.message);
  }

}

userSchema.methods.createAuthToken = function() {
  const token = jwt.sign({id: this.thirdPartyUid}, process.env.JWT_SECRET, {expiresIn: '2 days'});
  return token;
}


const User = mongoose.model('User', userSchema);

module.exports = User;

