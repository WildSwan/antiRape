const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Route to accept HTTP from SIM800L and forward to Firebase
app.post('/firebase', async (req, res) => {
  try {
    const { data } = req.body;  // Data from SIM800L
    const firebaseUrl = 'https://women-safety-device-3a56d-default-rtdb.firebaseio.com/00001.json?auth=ZrEhJQOWXmFD4AMvKFvhz7l7Vlg3d6iimpy3Luiq';

    const response = await axios.put(firebaseUrl, data, {
      headers: { 'Content-Type': 'application/json' }
    });

    res.json(response.data);  // Send Firebase response back to SIM800L
  } catch (error) {
    console.error('Error:', error.message);
    res.status(500).send('Error communicating with Firebase');
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
