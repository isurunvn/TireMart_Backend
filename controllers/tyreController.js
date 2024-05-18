// controllers/tyreControllers.js
const fs = require('fs');
const path = require('path');
const Tyre = require('../models/tyre');
const multer = require('multer');


exports.addTyre = async (req, res) => {
  try {
    let { tyreId, tyreSize, tyreBrand, vehicleCategory, price, oldPrice } = req.body;

    // Check if image file was uploaded
    if (!req.file) {
      return res.status(400).json({ message: 'Image file is required' });
    }

    // Convert tyreBrand and vehicleCategory to lowercase and remove spaces
    tyreBrand = tyreBrand.toUpperCase().replace(/\s+/g, '');
    vehicleCategory = vehicleCategory.toLowerCase().replace(/\s+/g, '');

    // Read image file from filesystem
    const image = fs.readFileSync(req.file.path);

    // Create tyre object with image data
    const newTyre = new Tyre({
      tyreId,
      tyreSize,
      tyreBrand,
      vehicleCategory,
      price,
      oldPrice,
      image: {
        data: image,
        contentType: req.file.mimetype
      }
    });

    // Save the tyre to the database
    await newTyre.save();

    // Delete temporary image file after saving to database
    // fs.unlinkSync(req.file.path);

    res.status(201).json({ message: 'Tyre added successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.getAllTyres = async (req, res) => {
  try {
    const tyres = await Tyre.find();

    res.status(200).json({ tyres });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch tyre details' });
  }
};

exports.getFilteredTyres = async (req, res) => {
try {
  // Extract search criteria from request query parameters
  const { tyreSize, tyreBrand, vehicleCategory } = req.query;

  // Construct the filter object based on provided search criteria
  const filter = {};
  if (tyreSize) filter.tyreSize = tyreSize;
  if (tyreBrand) filter.tyreBrand = tyreBrand;
  if (vehicleCategory) filter.vehicleCategory = vehicleCategory;

  const tyres = await Tyre.find(filter);

  res.status(200).json({ tyres });
} catch (err) {
  res.status(500).json({ message: 'Failed to fetch filtered tyres' });
}
};

exports.getBySize = async (req, res) => {
try {
  const { tyreSize } = req.query;

  const filter = {};
  if (tyreSize) filter.tyreSize = tyreSize;

  const tyres = await Tyre.find(filter);

  res.status(200).json({ tyres });
} catch (err) {
  res.status(500).json({ message: 'Failed to fetch filtered tyres' });
}
};

exports.removeTyre = async (req, res) => {
  try {
    const { tyreSize, tyreBrand, vehicleCategory } = req.query;

    const filter = {};
    if (tyreSize) filter.tyreSize = tyreSize;
    if (tyreBrand) filter.tyreBrand = tyreBrand;
    if (vehicleCategory) filter.vehicleCategory = vehicleCategory;

    const removedTyre = await Tyre.findOneAndRemove(filter);

    if (!removedTyre) {
      return res.status(404).json({ message: 'Tyre not found' });
    }

    res.status(200).json({ message: 'Tyre removed successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Failed to remove tyre' });
  }
};

