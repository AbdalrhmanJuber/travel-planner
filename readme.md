# Travel Planner

A **FEND Capstone** project that allows users to plan future trips by entering a city and a departure date. The app fetches **geographical data** from **Geonames**, **weather forecasts** from **Weatherbit**, and **images** from **Pixabay**. It also saves trip data in **Local Storage** and supports **offline capabilities** with a **service worker**.

## 📌 Table of Contents
- [Project Overview](#project-overview)
- [Features](#features)
- [Dependencies](#dependencies)
- [Installation](#installation)
- [Usage](#usage)
- [Development Scripts](#development-scripts)
- [Testing](#testing)
- [License](#license)

## 📖 Project Overview

This application is the final capstone for the Udacity Front End Web Developer Nanodegree. It integrates multiple APIs to display location-based weather forecasts and images for a user’s upcoming trip. Users can:

✔️ Enter a **city** and **departure date**.  
✔️ View how many days away their trip is.  
✔️ See typical weather forecast info for their arrival date.  
✔️ Retrieve a relevant photo of the destination.  
✔️ Save trip data in **Local Storage**.  
✔️ Leverage an **offline-capable** service worker for better performance.

## 🌟 Features

- **Geonames API** – Retrieves latitude, longitude, and country name from a city query.  
- **Weatherbit API** – Fetches future weather data (high/low temperatures, description).  
- **Pixabay API** – Shows a relevant photo of the city (or a fallback image if none found).  
- **Local Storage** – Persists the user’s trip data across page reloads.  
- **Responsive UI** – Works across desktop and mobile browsers.  
- **Offline Support** – A service worker caches essential assets for offline use.  

## 🛠 Dependencies

Refer to the `package.json` for exact versions. Key packages include:

- **Express** – Node.js framework for server  
- **Webpack** – Bundling and building assets  
- **Babel** – Transpiling modern JS for compatibility  
- **Jest** / **Supertest** – Testing frameworks  
- **cors**, **dotenv**, **body-parser** – For server functionality  
- **sass**, **style-loader**, **css-loader** – For styling  
- **workbox-webpack-plugin** – Generates a service worker  

## 🚀 Installation

1. **Clone this repository**:
   ```bash
   git clone https://github.com/AbdalrhmanJuberv/travel-planner.git
