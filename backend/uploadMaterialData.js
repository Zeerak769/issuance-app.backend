require('dotenv').config();
const mongoose = require('mongoose');
const XLSX = require('xlsx');
const Material = require('./models/Inventory'); // Adjust the path to your Material model

const dbURI = process.env.MONGO_URI; // Use environment variable for MongoDB URI

// Connect to MongoDB
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Could not connect to MongoDB:', err));

// Function to read data from Excel and insert it into MongoDB
const uploadData = async (filePath) => {
  // Read the Excel file
  const workbook = XLSX.readFile(filePath);
  const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
  const sheet = workbook.Sheets[sheetName];

  // Convert sheet to JSON
  const data = XLSX.utils.sheet_to_json(sheet);
  console.log(data);
  try {
    await Material.insertMany(data);
    console.log('Data successfully uploaded');
  } catch (error) {
    console.error('Error uploading data:', error);
  }

  // Close the database connection
  mongoose.connection.close();
  // Insert data into MongoDB
};

// Replace 'path-to-your-excel-file.xlsx' with the path to your Excel file
uploadData('Inventory.xlsx');
