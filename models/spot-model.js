const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const spotSchema = new Schema(
  {
    name: {type: String, required: true},
    workout: {type: String, enum: [ 'Cardio', 'Resistance', 'Cardio & Resistance']},//selector in the form
    location: { type: String},
    rating: {type: Number},
    image: {type: String}
  }
)

const SpotSchema = mongoose.model('Spot', spotSchema );

module.exports = SpotSchema;
