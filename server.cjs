const express = require('express');
const cors = require('cors'); // Import the cors middleware

const data = require('./data/data.json');

const app = express();
const port = 3001; // Change this to your desired port number
let isEnabled = true;

// Enable CORS for all routes (allow requests from any origin)
app.use(cors());

// GET endpoint
app.get('/api/tabs', (req, res) => {
  res.json(data);
});


// GET endpoint
app.get('/api/tabs/status', (req, res) => {
  res.json(isEnabled);
});

// PUT endpoint
app.put('/api/tabs', express.json(), (req, res) => {
  // Replace this with your logic to handle the POST request
  const receivedData = req.body;
  const tabData = data.data.tabdata[receivedData.tabId];
  if(receivedData.isActive){
    tabData.inactive = tabData.inactive.filter((item) => item !== receivedData.id);
    tabData.active.push(receivedData.id);
  }else{
    tabData.active = tabData.active.filter((item) => item !== receivedData.id);
    tabData.inactive.push(receivedData.id);
  }
  const response = { message: 'Received data:', data: receivedData };
  res.json(response);
});

// POST endpoint
app.post('/api/tabs', express.json(), (req, res) => {
  const allEnabled = req.body.allEnabled;
  isEnabled = allEnabled;
  if(allEnabled){
    Object.keys(data.data.tabdata).forEach((tab) => {
      data.data.tabdata[tab].disabled = []
    })
  }else{
    Object.keys(data.data.tabdata).forEach((tab) => {
      data.data.tabdata[tab].disabled = data.data.tabdata[tab].active.concat(data.data.tabdata[tab].inactive);
    })
  }

  res.json(data);
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
