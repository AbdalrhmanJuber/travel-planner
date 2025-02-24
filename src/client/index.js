// src/client/index.js

// Import the initialization function and SCSS (which Webpack will process)
import { initUI } from './js/app';
import './styles/style.scss';

// Wait for the DOM to fully load, then initialize the UI.
document.addEventListener('DOMContentLoaded', () => {
  initUI();
});
