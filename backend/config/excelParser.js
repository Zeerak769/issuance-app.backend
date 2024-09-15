// Load and parse the Excel file
const workbook = xlsx.readFile('path_to_your_file.xlsx');
const sheetName = workbook.SheetNames[0]; // Assuming the data is in the first sheet
const worksheet = workbook.Sheets[sheetName];

// Convert worksheet to JSON format
const jsonData = xlsx.utils.sheet_to_json(worksheet);

// Insert data into MongoDB
Material.insertMany(jsonData)
    .then(() => {
        console.log('Data successfully inserted into MongoDB');
        mongoose.connection.close();
    })
    .catch((err) => {
        console.error('Error inserting data:', err);
    });
