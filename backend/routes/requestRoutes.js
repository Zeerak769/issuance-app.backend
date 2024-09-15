// routes/requestRoutes.js
const express = require('express');
const { createRequest, getAllRequests, updateRequestStatus } = require('../controllers/requestController');
const authMiddleware = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', authMiddleware, createRequest);
router.get('/', authMiddleware, getAllRequests);
router.patch('/:id', authMiddleware, updateRequestStatus);

module.exports = router;
