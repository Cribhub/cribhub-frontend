// cypress-run.js

require('dotenv').config();
const cypress = require('cypress');

cypress.run({
  config: {
    baseUrl: process.env.VITE_APP_URL
  }
});