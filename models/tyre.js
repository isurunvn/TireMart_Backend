// models/tyre.js
const mongoose = require('mongoose');

const tyreSchema = new mongoose.Schema({
  tyreId: { type: String, required: true },
  tyreSize: { type: String, required: true },
  tyreBrand: { type: String, required: true },
  vehicleCategory: { type: String, required: true },
  price: { type: Number, required: true },
  oldPrice: { type: Number },
  image: {
    data: Buffer,
    contentType: String,
  }
});

module.exports = mongoose.model('Tyre', tyreSchema);
