// routes/userRoutes.js
const express = require('express');
const { getUserById, getAllManagers, getUserByUsername } = require('../controllers/userController');

const router = express.Router();

router.get('/:id', getUserById);
router.get('/fetch/managers', getAllManagers); // Route to get all managers
router.get('/username/:username', getUserByUsername); // Route to get user by username


module.exports = router;
