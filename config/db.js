const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://isurunaveen27:iGtpmrdj0HNcGt92@cluster0.m4yhicl.mongodb.net/';

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1);
  }
};

module.exports = connectDB;
