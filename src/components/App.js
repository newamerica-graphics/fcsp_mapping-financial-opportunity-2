import './App.scss';

import React from 'react';
import renderMap from './map';

import { sum } from '../lib/calc';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      overlayData: {}
    }
  }
  componentDidMount(){
    renderMap.bind(this)('viz__map');
  }

  handleMousemove = (overlayData) => {

    this.setState({
      overlayData
    });
  }

  render(){
    let { overlayData } = this.state;
    let { PRI_NEIGH, TotAltLoan, TotAltCred, estfampov, estwhite } = overlayData;
    let nonWhite = 1 - estwhite;
    return (
      <div className="viz">
        <div id="viz__map" />
        <div className="viz__overlay">
          <h1>{PRI_NEIGH}</h1>
        </div>
      </div>
    );
  }
}
