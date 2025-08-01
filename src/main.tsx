import React from 'react';
import { createRoot } from 'react-dom/client';
import App from './App';
import './index.css';
import { registerSW } from 'virtual:pwa-register';

// register service worker for PWA (auto-update etc)
registerSW({
  onNeedRefresh() {
    // You can add a notification here to let the user know about the update
    console.log('New content available, please refresh');
  },
  onOfflineReady() {
    console.log('App ready to work offline');
  },
});

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
