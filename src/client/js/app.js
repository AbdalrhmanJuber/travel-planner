// src/client/js/app.js

// Example utility function: Calculate number of days from today until departureDate.
// This function now returns 0 if the absolute difference is less than 1 day.
export function calculateDaysAway(departureDate) {
    const today = new Date();
    const depDate = new Date(departureDate);
    const diffInMs = depDate - today;
    const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return Math.abs(diffInDays) < 1 ? 0 : diffInDays;
  }
  
  // ----------------------------------------------------------------
  // Your existing application functions (API calls, UI updates, etc.)
  // ----------------------------------------------------------------
  const geoUsername = 'abdelrahman_juber';
  
  export async function handleGenerateClick() {
    const city = document.getElementById('city').value;
    const departureDate = document.getElementById('departure').value; // Expected format: YYYY-MM-DD
  
    if (!city || !departureDate) {
      alert('Please enter a city and departure date.');
      return;
    }
  
    try {
      const locationData = await getLocationData(city);
      if (locationData) {
        const { latitude, longitude, country } = locationData;
        // Fetch future weather data from Weatherbit Forecast API
        const weatherData = await getWeatherData(latitude, longitude, departureDate);
        // Fetch an image from Pixabay API using the city name
        const imageURL = await getImageData(city);
        
        const tripData = { city, country, departureDate, weather: weatherData, imageURL };
        updateUI(tripData);
        saveTripData(tripData); // Save trip data in local storage
      } else {
        alert('City not found.');
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  // Function to fetch location data from Geonames API
  async function getLocationData(city) {
    const response = await fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${geoUsername}`);
    const data = await response.json();
  
    if (data.geonames.length > 0) {
      const location = data.geonames[0];
      return {
        latitude: location.lat,
        longitude: location.lng,
        country: location.countryName,
      };
    }
    return null;
  }
  
  // Function to fetch future weather data from Weatherbit Forecast API
  async function getWeatherData(lat, lon, departureDate) {
    const weatherbitKey = 'b144eb429d304a9e812376c38cdfef07';
    const response = await fetch(`https://api.weatherbit.io/v2.0/forecast/daily?lat=${lat}&lon=${lon}&units=I&key=${weatherbitKey}`);
    const data = await response.json();
    
    // Find the forecast matching the departure date; if none, default to the first forecast.
    let forecast = data.data.find(f => f.datetime === departureDate);
    if (!forecast) forecast = data.data[0];
    
    return {
      high: forecast.max_temp,
      low: forecast.min_temp,
      description: forecast.weather.description,
      forecastDate: forecast.datetime
    };
  }
  
  // Function to fetch an image from Pixabay API based on the city name
  async function getImageData(city) {
    const pixabayKey = '49039988-0e24d471d044d8a491cf7162e';
    const encodedCity = encodeURIComponent(city);
    const response = await fetch(`https://pixabay.com/api/?key=${pixabayKey}&q=${encodedCity}&image_type=photo&category=places&per_page=3`);
    const data = await response.json();
    
    if (data.hits && data.hits.length > 0) {
      return data.hits[0].webformatURL;
    } else {
      // Fallback image if no results are found.
      return 'https://via.placeholder.com/400x200?text=No+Image+Found';
    }
  }
  
  // Function to update UI with fetched trip data
  export function updateUI(tripData) {
    const { city, country, departureDate, weather, imageURL } = tripData;
    const today = new Date();
    const departure = new Date(departureDate);
    const daysAway = Math.ceil((departure - today) / (1000 * 60 * 60 * 24));
    
    document.getElementById('trip-location').textContent = `${city}, ${country}`;
    document.getElementById('trip-location-text').textContent = `${city}, ${country}`;
    document.getElementById('trip-date').textContent = departureDate;
    document.getElementById('days-away').textContent = daysAway;
    document.getElementById('high-temp').textContent = weather.high;
    document.getElementById('low-temp').textContent = weather.low;
    document.getElementById('weather-description').textContent = weather.description;
    document.getElementById('trip-image').src = imageURL;
  }
  
  // Function to save trip data to Local Storage
  export function saveTripData(tripData) {
    localStorage.setItem('tripData', JSON.stringify(tripData));
  }
  
  // Function to load trip data from Local Storage when the DOM is ready
  export function loadTripData() {
    const savedData = localStorage.getItem('tripData');
    if (savedData) {
      const tripData = JSON.parse(savedData);
      updateUI(tripData);
    }
  }
  
  // Initialization function: Call this after DOM is ready (in index.js)
  export function initUI() {
    const generateBtn = document.getElementById('generate');
    if (generateBtn) {
      generateBtn.addEventListener('click', handleGenerateClick);
    }
    loadTripData();
  }
  