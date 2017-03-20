const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const phoneSchema = new Schema({
  brand: {
    type: String,
    required: [true, 'the pone name is required']
  },
  name: {
    type: String,
    required: [true, 'the pone name is required']
  },
  image: {
    type: String,
    default: ''},
  specs: {
    type: Array,
    default: []
  }
})

const Phone = mongoose.model('Phone', phoneSchema);

module.exports = Phone;