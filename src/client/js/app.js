// src/client/js/app.js

export function calculateDaysAway(departureDate) {
  const today = new Date();
  const depDate = new Date(departureDate);
  const diffInMs = depDate - today;
  const diffInDays = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));

  // Return 0 if the trip is less than 1 day away
  return Math.abs(diffInDays) < 1 ? 0 : diffInDays;
}

export async function handleGenerateClick() {
  const city = document.getElementById('city').value;
  const departureDate = document.getElementById('departure').value;

  if (!city || !departureDate) {
    alert('Please enter a city and departure date.');
    return;
  }

  try {
    // Instead of calling external APIs from the browser,
    // make a request to our local server route: /tripData
    const response = await fetch('/tripData', {
      method: 'POST',
      credentials: 'same-origin',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ city, departureDate }),
    });

    // Parse the JSON result
    const tripData = await response.json();

    if (tripData.error) {
      alert(tripData.error);
      return;
    }

    // Update the UI with the returned data
    updateUI(tripData);

    // Optionally, save the data in local storage
    saveTripData(tripData);
  } catch (error) {
    console.error('Error fetching trip data:', error);
  }
}

export function updateUI(tripData) {
  const { city, country, departureDate, weather, imageURL } = tripData;

  const today = new Date();
  const departure = new Date(departureDate);
  const daysAway = Math.ceil((departure - today) / (1000 * 60 * 60 * 24));

  // Show city & country
  document.getElementById('trip-location').textContent = `${city}, ${country}`;
  document.getElementById('trip-location-text').textContent = `${city}, ${country}`;

  // Show departure date
  document.getElementById('trip-date').textContent = departureDate;

  // Show how many days away
  document.getElementById('days-away').textContent = daysAway;

  // Show weather
  document.getElementById('high-temp').textContent = weather.high;
  document.getElementById('low-temp').textContent = weather.low;
  document.getElementById('weather-description').textContent = weather.description;

  // Show image
  document.getElementById('trip-image').src = imageURL;
}

// ----------------------------------------------------------------
// LOAD TRIP DATA IN LOCAL STORAGE
// ----------------------------------------------------------------
export function saveTripData(tripData) {
  localStorage.setItem('tripData', JSON.stringify(tripData));
}

export function loadTripData() {
  const savedData = localStorage.getItem('tripData');
  if (savedData) {
    const tripData = JSON.parse(savedData);
    updateUI(tripData);
  }
}

export function initUI() {
  const generateBtn = document.getElementById('generate');
  if (generateBtn) {
    generateBtn.addEventListener('click', handleGenerateClick);
  }
  loadTripData();
}
