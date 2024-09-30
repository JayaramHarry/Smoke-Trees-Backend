const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Address = require('../models/Address');

// POST /register - Register a user with their address
router.post('/register', async (req, res) => {
  const { name, address } = req.body;

  try {
    // Create and save the user
    const newUser = new User({ name });
    const savedUser = await newUser.save();

    // Create and save the address associated with the user
    const newAddress = new Address({
      address,
      userId: savedUser._id
    });
    const savedAddress = await newAddress.save();

    res.status(201).json({
      message: 'User and address saved successfully!',
      user: savedUser,
      address: savedAddress
    });
  } catch (err) {
    res.status(500).json({ message: 'Error saving user and address', error: err });
  }
});

// GET /users - Get all users with their addresses
router.get('/users', async (req, res) => {
  try {
    const users = await User.find().lean();

    const usersWithAddresses = await Promise.all(
      users.map(async (user) => {
        const addresses = await Address.find({ userId: user._id }).lean();
        return { ...user, addresses };
      })
    );

    res.status(200).json(usersWithAddresses);
  } catch (err) {
    res.status(500).json({ message: 'Error fetching users and addresses', error: err });
  }
});

// GET /users/:id - Get a specific user with their addresses
router.get('/users/:id', async (req, res) => {
  const userId = req.params.id;

  try {
    const user = await User.findById(userId).lean();
    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const addresses = await Address.find({ userId }).lean();
    res.status(200).json({ user, addresses });
  } catch (err) {
    res.status(500).json({ message: 'Error fetching user and addresses', error: err });
  }
});

module.exports = router;
