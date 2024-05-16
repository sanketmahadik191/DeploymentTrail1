require('dotenv').config(); // Load environment variables from .env file
const express = require('express');
const axios = require('axios');
const fs = require('fs');

const PORT = process.env.PORT || 4002;
const server = express();

server.listen(PORT, '0.0.0.0', () => { // Listen on all available network interfaces
  console.log(`Express server is listening on port ${PORT}`);
});

const url = 'https://icanhazdadjoke.com/';
const headers = {
  'Accept': 'text/plain'
};

const fetchJoke = async () => {
  try {
    const response = await axios.get(url, { headers });
    console.log("Random Joke - " + response.data);
    return response.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
}

server.get('/jokes', async (request, response) => {
  try {
    const jokeData = await fetchJoke();
    response.status(200).json(jokeData);
  } catch (error) {
    console.log('Error occurred - ' + error.message);
    response.status(500).send('Internal Server Error');
  }
});

server.get('/add', async (request, response) => {
  try {
    response.status(200).json('hello here');
  } catch (error) {
    console.log('Error occurred - ' + error.message);
    response.status(500).send('Internal Server Error');
  }
});

server.use((req, res) => {
  res.status(404).send('Not Found');
});
