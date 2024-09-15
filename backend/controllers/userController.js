// controllers/userController.js
const User = require('../models/User'); // Adjust the path as necessary

// Get a single user by ID
exports.getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await User.findById(id);
    console.log(user)
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json({ username: user.username });
  } catch (error) {
    res.status(500).json({ message: 'GetUsers' });
  }
};

// Get all users with role 'manager'
exports.getAllManagers = async (req, res) => {
  try {
    const managers = await User.find({ role: 'manager' }); // Query to find all users with role 'manager'
    console.log(managers);
    res.json(managers);
  } catch (error) {
    console.log("managers");
    res.status(500).json({ message: 'GetManagers' });
  }
};


exports.getUserByUsername = async (req, res) => {
  const { username } = req.params;

  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }
    res.json(user); // Send the full user object back to the frontend, including the role
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};
