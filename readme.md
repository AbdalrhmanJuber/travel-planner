# Travel Planner

A **FEND Capstone** project that allows users to plan future trips by entering a city and a departure date. The app fetches **geographical data** from **Geonames**, **future weather forecasts** from **Weatherbit**, and **destination images** from **Pixabay**. It also saves trip data in **Local Storage** and supports **offline capabilities** with a **service worker**.

## Table of Contents
- [Project Overview](#project-overview)
- [Node.js Version](#nodejs-version)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Development Scripts](#development-scripts)
- [Testing](#testing)
- [License](#license)

## Project Overview

This application is the final capstone for the Udacity Front End Web Developer Nanodegree. It integrates multiple APIs to display location-based weather forecasts, images, and trip details. Users can:
- Enter a **city** and **departure date**.
- View how many days away their trip is.
- See forecasted weather information for the selected day.
- Retrieve a relevant photo of the destination.
- Save trip data in **Local Storage**.
- Experience offline functionality via a registered service worker.

## Node.js Version

This project was developed and tested using **Node.js v22.11.0**.  


## Features

- **Geonames API** – Retrieves latitude, longitude, and country name from a city query.
- **Weatherbit API** – Fetches future weather data (high/low temperatures, weather description) based on location.
- **Pixabay API** – Retrieves a relevant photo of the city (with a fallback image if no result is found).
- **Local Storage** – Persists the user’s trip data across page reloads.
- **Responsive UI** – Works across desktop and mobile browsers.
- **Offline Support** – A service worker caches essential assets for offline use.

## Dependencies

Refer to the `package.json` for exact versions. Key packages include:
- **Express** – Node.js framework for server
- **Webpack** – Bundling and building assets
- **Babel** – Transpiling modern JS for compatibility
- **Jest** / **Supertest** – Testing frameworks
- **cors**, **dotenv**, **body-parser** – For server functionality
- **sass**, **style-loader**, **css-loader** – For styling
- **workbox-webpack-plugin** – Generates a service worker

## Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/AbdalrhmanJuberv/travel-planner.git
   cd travel-planner


2. **Install dependencies**:
   npm install
   If you encounter peer-dependency conflicts, try:
   npm install --legacy-peer-deps


3. **Create a .babelrc file (if not present)**:

   {
  "presets": ["@babel/preset-env"]
   }

4. **Add your API keys (if required)**:

   In a .env file or directly in your code, store the API keys for Geonames, Weatherbit, and Pixabay.

## Usage:


1. **Build for production**:
   npm run build-prod

2. **Start the server**:
   npm run start

   The Express server runs on port 3000 by default (visit http://localhost:3000).

The Express server runs on port 3000 by default (visit [http://localhost:3000](http://localhost:3000)).

3. **Load the application**:

   Open your browser and navigate to [http://localhost:3000](http://localhost:3000).
   Enter a city and departure date, then click **Generate Trip**.

4. **Test offline**:

   Open your browser's DevTools → Application tab → Service Workers.
   Switch to **Offline** mode in the Network tab and reload the page to verify offline caching.