const User = require('../models/user');

exports.registerUser = async (req, res) => {
  try {
    const { username, email, mobileNumber, password } = req.body;
    const newUser = new User({ username, email, mobileNumber, password });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

exports.loginUser = async (req, res) => {
    try {
      const { email, password } = req.body;
      const user = await User.findOne({ email, password }); // hash the password before querying
      if (!user) {
        res.status(401).json({ message: 'Invalid email or password' });
        return;
      }
      // create a JWT token for authentication if needed
      res.status(200).json({ message: 'Login successful', user });
    } catch (err) {
      res.status(400).json({ message: err.message });
    }
  };