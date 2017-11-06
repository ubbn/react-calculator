import React from 'react';
import ReactDOM from 'react-dom';
//import Calculator from './components/Calculator';
import BootstrapCalculator from './components/BootstrapCalculator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div id="wrapper">
    <BootstrapCalculator />
  </div>
  , document.getElementById('app'));
registerServiceWorker();
