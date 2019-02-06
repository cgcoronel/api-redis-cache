// Import the installed modules.
const express = require('express');
const responseTime = require('response-time')
const axios = require('axios');
const redis = require('redis');

const app = express();

// create and connect redis client to local instance.
const client = redis.createClient();

// Print redis errors to the console
client.on('error', (err) => {
  console.log("Error " + err);
});

// use response-time as a middleware
app.use(responseTime());


// create an api/search route
app.get('/api/search', (req, res) => {

  const query = (req.query.query).trim();
  // Build the Wikipedia API url
  const searchUrl = `http://localhost:3678/api/productos`;

  // Try fetching the result from Redis first in case we have it cached
  return client.get(`productos:${query}`, (err, result) => {
    // If that key exist in Redis store
    if (result) {
      const resultJSON = JSON.parse(result);
      return res.status(200).json(resultJSON);
    } else { // Key does not exist in Redis store
      // Fetch directly from productos API
      return axios.get(searchUrl)
        .then(response => {
          const responseJSON = response.data;
          // Save the productos API response in Redis store
          client.setex(`productos:${query}`, 3600, 
            JSON.stringify({ source: 'Redis Cache', ...responseJSON, }));
          // Send JSON response to client
          return res.status(200).json({ source: 'Productos API', ...responseJSON, });
        })
        .catch(err => {
          return res.json(err);
        });
    }
  });
});

app.listen(3000, () => {
  console.log('Server listening on port: ', 3000);
});