import './App.scss';

import React from 'react';
import renderMap from './map';
import ScatterPlot from './scatterplot';

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
    // new ScatterPlot('#nbhd-scatterplot',{
    //   x: (d) => ( 1 - d.estwhite ),
    //   y: (d) => ( d.TotAltCred )
    // }, data );
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
          <div id="nbhd-scatterplot" className="nbhd-scatter-plot">

          </div>
          <div className="nbhd-info">
            <h2>{PRI_NEIGH}</h2>
          </div>
        </div>
      </div>
    );
  }
}
