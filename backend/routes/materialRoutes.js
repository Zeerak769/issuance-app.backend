const express = require('express');
const router = express.Router();
const materialController = require('../controllers/materialController');

// Get all materials


// Get material by ID
router.get('/:id', materialController.getMaterialById);

// Create new material
router.post('/', materialController.createMaterial);

// Update material by ID
router.put('/:id', materialController.updateMaterial);

// Delete material by ID
router.delete('/:id', materialController.deleteMaterial);

// Get materials by material name
router.get('/material/:material', materialController.getMaterialsByMaterial);

// Get materials by machine type
router.get('/machine/:machine', materialController.getMaterialsByMachine);

// **New Route**: Get all unique machine types
// Get distinct machine types
router.get('/', materialController.getMachineTypes);
router.get('/description/:description', materialController.getMaterialByDescription);

module.exports = router;
