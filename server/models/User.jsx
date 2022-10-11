const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const validator = require('validator');


const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: [true, 'Please enter an email'],
    unique: true,
    lowercase: true,
    validate: [validator.isEmail, 'Please enter a valid email']
  },
  password: {
    type:String,
    required: [true, 'Please enter a valid password'],
    minlength: [6, 'Minimum password length must be 6 characters'],
    maxlength: [24, 'Maximum password length must be 24 characters']
  },
  register_date: {
    type: Date,
    required: true,
    default: Date.now
  }
});

module.exports = User =  mongoose.model('user', UserSchema);