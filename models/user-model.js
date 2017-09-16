const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    email: {
      type: String,
      required: true
    },
    encryptedPassword: {type: String},
    facebookID:        {type: String},
    googleID:          {type: String},
    name:              {type: String},
    height:            {type: Number},
    weight:            {type: Number},
    activity:          {type: String, enum: [ 'high', 'medium', 'low']},
    gender:            {type: String, enum: [ 'male', 'female']},
    age:               {type: Number},
    goal:              {type: String, enum: [ 'increase mass', 'reduce weight', 'mantain']}
  },
  {
    timestamps: true
  }
);

const UserModel = mongoose.model('User', userSchema);

module.exports = UserModel;
