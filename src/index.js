/****************************
Treehouse FSJS Techdegree:
Project 7 - React Gallery App
Student: Ryan Agatep
index.js - Entry to the app
****************************/

// Imports Libraries
import React from 'react';
import ReactDOM from 'react-dom';
// Project CSS
import './css/index.css';
import App from './components/App';

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

