const mongoose = require('mongoose'); // Add this line

const requestSchema = new mongoose.Schema({
  description: String,
  quantityRequested: Number,
  status: {
    type: String,
    enum: ['Pending', 'Approved', 'Rejected', 'Issued'],
    default: 'Pending'
  },
  material: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Material'
  },
  requester: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  approvedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  issuedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  requestedManager: {
    type: String,
    required: true
  },
  shift: {
    type: String,
    enum: ['Morning', 'Evening', 'Night'],
    required: true
  }
}, { timestamps: true });

const Request = mongoose.model('Request', requestSchema);
module.exports = Request;
