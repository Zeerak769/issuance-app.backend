const Request = require('../models/Request');
const Material = require('../models/Inventory');
const User = require('../models/User');

// Create a new request
exports.createRequest = async (req, res) => {
  const { description, quantityRequested, requestedManager, shift } = req.body;
   
  try {
    const request = new Request({
      description,
      quantityRequested,
      requester: req.user._id,
      requestedManager,
      shift // Store the shift
    });
    await request.save();
    res.status(201).json({ message: 'Request created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get all requests with additional requester and manager details
exports.getAllRequests = async (req, res) => {
  try {
    const requests = await Request.find()
      .populate('requester') // Populate the requester details
      .exec();

    // Map over requests to include both requester and manager usernames
    const requestsWithDetails = requests.map((request) => {
      const user = request.requester ? request.requester.username : 'Unknown';
      return {
        ...request.toObject(),
        requesterUsername: user,
        requestedManager: request.requestedManager, // Already stored as string
      };
    });

    res.json(requestsWithDetails);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update request status and handle material quantity changes
exports.updateRequestStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const request = await Request.findById(id);
    if (!request) {
      return res.status(404).json({ message: 'Request not found' });
    }

    // Find the material based on the description
    const material = await Material.findOne({ material_description: request.description });

    if (!material) {
      return res.status(404).json({ message: 'Material not found for the given description' });
    }

    if (status === 'Approved') {
      // Check if the material has enough quantity
      request.approvedBy = req.user._id;  // Set the user who approved
    } else if (status === 'Issued') {
      if (material.quantity >= request.quantityRequested) {
        console.log(material.quantity)
        material.quantity -= request.quantityRequested;  // Subtract requested quantity
        console.log(material.quantity)
        await material.save();  // Save the updated material quantity
      } else {
        return res.status(400).json({ message: 'Not enough material in stock' });
      }
      request.issuedBy = req.user._id;  // Set the user who issued
    }

    request.status = status;
    await request.save();  // Save the updated request
    res.json({ message: 'Request status updated successfully' });
  } catch (error) {
    console.error('Server error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
