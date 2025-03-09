// src/server/index.js
const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const fetch = require('node-fetch');

let projectData = {};

const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

// Initialize the main project folder to serve the production bundle
app.use(express.static('dist'));

const geoUsername   = "abdelrahman_juber";
const weatherbitKey = "b144eb429d304a9e812376c38cdfef07";
const pixabayKey    = "49039988-0e24d471d044d8a491cf7162e";

async function getLocationData(city) {
  const baseURL = 'http://api.geonames.org/searchJSON';
  const url = `${baseURL}?q=${encodeURIComponent(city)}&maxRows=1&username=${geoUsername}`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.geonames && data.geonames.length > 0) {
    const location = data.geonames[0];
    return {
      latitude: location.lat,
      longitude: location.lng,
      country: location.countryName,
    };
  }
  return null;
}

async function getWeatherData(lat, lon) {
  const baseURL = 'https://api.weatherbit.io/v2.0/forecast/daily';
  const url = `${baseURL}?lat=${lat}&lon=${lon}&units=I&key=${weatherbitKey}`;

  const response = await fetch(url);
  return await response.json();
}

async function getImageData(city) {
  const baseURL = 'https://pixabay.com/api';
  const url = `${baseURL}/?key=${pixabayKey}&q=${encodeURIComponent(city)}&image_type=photo&category=places&per_page=3`;
  
  const response = await fetch(url);
  const data = await response.json();

  if (data.hits && data.hits.length > 0) {
    return data.hits[0].webformatURL;
  } else {
    // fallback image if no image is found
    return 'https://via.placeholder.com/400x200?text=No+Image+Found';
  }
}
app.post('/tripData', async (req, res) => {
  try {
    const { city, departureDate } = req.body;

    // 4A. GET GEO DATA
    const locationData = await getLocationData(city);
    if (!locationData) {
      return res.status(404).json({ error: 'City not found in GeoNames.' });
    }
    const { latitude, longitude, country } = locationData;

    const weatherResponse = await getWeatherData(latitude, longitude);
    // Attempt to match forecast date to user-provided departureDate
    let forecast = weatherResponse.data.find(f => f.datetime === departureDate);
    // If we don't find an exact match, fallback to the first day
    if (!forecast) {
      forecast = weatherResponse.data[0];
    }

    const imageURL = await getImageData(city);
    projectData = {
      city,
      country,
      departureDate,
      weather: {
        high: forecast.max_temp,
        low: forecast.min_temp,
        description: forecast.weather.description,
        forecastDate: forecast.datetime
      },
      imageURL
    };
    return res.json(projectData);
  } catch (error) {
    console.error('Error in /tripData route:', error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

app.get('/all', (req, res) => {
  res.send(projectData);
});
if (require.main === module) {
  const port = 3000;
  app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
  });
}

module.exports = app;
