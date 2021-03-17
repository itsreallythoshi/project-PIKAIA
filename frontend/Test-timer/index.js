import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import SettingsContextProvider from './context/SettingsContext';
import CountdownAnimation from './components/CountdownAnimation';
import SetTimer from '.'


ReactDOM.render(
  <SettingsContextProvider>
   <App />
  </SettingsContextProvider>,
  document.getElementById('root')
);

