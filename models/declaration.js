// models/Declaration.js
const mongoose = require('mongoose');

const declarationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Declaration', declarationSchema);
