const multer = require('multer');
const path = require('path');
const XLSX = require('xlsx');
const Material = require('../models/Inventory'); // Import the Material model

// Configure multer for file upload
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Folder to store uploaded files
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Append timestamp to filename
  }
});

const upload = multer({ storage });

// Controller function to handle file upload and data processing
const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send('No file uploaded.');
    }

    // Read the uploaded file
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    // Process each row and save to the database
    for (const item of data) {
      const material = new Material({
        sr_no: item['SR #'],
        material: item['Material'],
        part_no_store_code: item['PART NO / STORE CODE'],
        material_description: item['Material Description'],
        uom: item['UOM'],
        quantity: item['QUANTITY'],
        unit_price: item['UNIT PRICE'],
        total_price: item['TOTAL PRICE'],
        machine: item['MACHINE'],
        min: item['MIN'],
        max: item['MAX']
      });
      await material.save();
    }

    // Delete the uploaded file after processing
    fs.unlinkSync(req.file.path);

    res.status(200).send('File uploaded and data processed successfully.');
  } catch (error) {
    console.error('Error uploading file:', error);
    res.status(500).send('Server error.');
  }
};

module.exports = { upload, uploadFile };
