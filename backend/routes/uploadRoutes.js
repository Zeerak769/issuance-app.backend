const express = require('express');
const router = express.Router();
const { upload, uploadFile } = require('../controllers/uploadController');

// Define the route for file upload
router.post('/uploadFile', upload.single('file'), uploadFile);

module.exports = router;
