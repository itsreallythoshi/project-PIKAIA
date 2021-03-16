import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SettingsContextprovider from './context/SettingsContext';
import CountdownAnimation from './components/CountdownAnimation';
import SetTimer from '.'


ReactDOM.render(
  <SettingsContextprovider>
   <App />
  </SettingsContextprovider>,
  document.getElementById('root')
);

