import './index.scss';
import App from './components/App';

import React from 'react';
import ReactDOM from 'react-dom';

window.renderDataViz = function(el){
  if(el){
    ReactDOM.render(<App />, el);
  }
}
