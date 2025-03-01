// src/client/index.js

import { initUI } from './js/app';
import './styles/style.scss';

// Wait for the DOM to be fully loaded, then initialize the UI.
document.addEventListener('DOMContentLoaded', () => {
  initUI();

  // Register the service worker for offline capabilities
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', () => {
      navigator.serviceWorker.register('/service-worker.js')
        .then(registration => {
          console.log('Service Worker registered with scope:', registration.scope);
        })
        .catch(error => {
          console.error('Service Worker registration failed:', error);
        });
    });
  }
});
