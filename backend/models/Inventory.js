const mongoose = require('mongoose');
// Define Mongoose Schema
const MaterialSchema = new mongoose.Schema({
    sr_no: Number,  // SR #
    material: Number,  // Material
    part_no_store_code: String,  // PART NO / STORE CODE
    material_description: String,  // Material Description
    uom: String,  // UOM
    quantity: Number,  // QUANTITY
    unit_price: Number,  // UNIT PRICE
    total_price: Number,  // TOTAL PRICE
    machine: String,  // MACHINE
    min: String,  // MIN
    max: String  // MAX
});

const Material = mongoose.model('Material', MaterialSchema); 
module.exports = Material;