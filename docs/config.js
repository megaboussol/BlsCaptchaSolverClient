// config.js
const API_ENDPOINT = 'https://restless-mode-4e0e.viserlesommet.workers.dev/?key=';
const config = {
  tessedit_char_whitelist: '0123456789',
  textord_underline_width: "1",
};

// Expose les variables globalement
window.API_ENDPOINT = API_ENDPOINT;
window.config = config;
