import './App.scss';

import React from 'react';
import renderMap from './map';
import ScatterPlot from './scatterplot';

import { sum } from '../lib/calc';

export default class App extends React.Component {
  constructor(props){
    super(props);
    this.state = {
      overlayData: {},
      scatterPlotData: []
    }

    this.plot = {};
  }

  componentDidMount(){
    renderMap.bind(this)('viz__map');

  }

  loadData = (scatterPlotData) => {
    this.setState({
      scatterPlotData
    });

    this.plot = new ScatterPlot('#nbhd-scatterplot',{
      x: (d) => ( d.estminor/100 ),
      y: (d) => ( d.TotAltCred ),
      mouseenter: this.handleMousemove
    }, scatterPlotData).render();
  }

  toggleData = (e) => {
    this.plot.x((d) => d[e.target.value]/100).update();
  }

  handleMousemove = (overlayData) => {
    this.setState({
      overlayData
    });
  }

  render(){
    let { overlayData, scatterPlotData } = this.state;
    let { PRI_NEIGH, TotAltLoan, TotAltCred, estfampov, estwhite } = overlayData;
    let nonWhite = 1 - estwhite;
    return (
      <div className="viz">
        <div id="viz__map" />
        <div className="viz__overlay">
          <div id="nbhd-scatterplot" className="nbhd-scatter-plot" />
          <select onChange={this.toggleData}>
            <option value='estminor'>% Minorities</option>
            <option value='estfampov'>% Poverty</option>
          </select>
          <div className="nbhd-info">
            <h2>{PRI_NEIGH}</h2>
          </div>
        </div>
      </div>
    );
  }
}
