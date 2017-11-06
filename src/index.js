import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from './components/Calculator';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <div id="wrapper">
    <Calculator />
  </div>
  , document.getElementById('app'));
registerServiceWorker();
