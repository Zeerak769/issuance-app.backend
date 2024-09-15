const Material = require('../models/Inventory');

// Get all materials
const getMachineTypes = async (req, res) => {
    try {
        const materials = await Material.distinct('machine');
        
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get material by ID
const getMaterialById = async (req, res) => {
    try {
        const material = await Material.findById(req.params.id);
        if (!material) return res.status(404).json({ message: 'Material not found' });
        res.json(material);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Create new material
const createMaterial = async (req, res) => {
    const material = new Material(req.body);
    try {
        const newMaterial = await material.save();
        res.status(201).json(newMaterial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Update material by ID
const updateMaterial = async (req, res) => {
    try {
        const updatedMaterial = await Material.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedMaterial) return res.status(404).json({ message: 'Material not found' });
        res.json(updatedMaterial);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
};

// Delete material by ID
const deleteMaterial = async (req, res) => {
    try {
        const deletedMaterial = await Material.findByIdAndDelete(req.params.id);
        if (!deletedMaterial) return res.status(404).json({ message: 'Material not found' });
        res.json({ message: 'Material deleted' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get materials by material name
const getMaterialsByMaterial = async (req, res) => {
    try {
        const materials = await Material.find({ material: req.params.material });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get materials by machine type
const getMaterialsByMachine = async (req, res) => {
    try {
        const materials = await Material.find({ machine: req.params.machine });
        res.json(materials);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

// Get all unique machine types
// Fetch distinct machine types


const getMaterialByDescription = async (req, res) => {
    try {
        const material = await Material.find({ material_description: req.params.description });
        if (!material) return res.status(404).json({ message: 'Material not found' });
        res.json(material);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
};

module.exports = {
    getMaterialById,
    createMaterial,
    updateMaterial,
    deleteMaterial,
    getMaterialsByMaterial,
    getMaterialsByMachine,
    getMachineTypes,
    getMaterialByDescription,
};
