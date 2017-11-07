import React from 'react';
import ReactDOM from 'react-dom';
import BootstrapCalculator from './components/BootstrapCalculator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BootstrapCalculator />
  , document.getElementById('root'));
registerServiceWorker();
