import { select as d3select, selectAll as d3selectAll, scaleLinear as d3scaleLinear } from 'd3';

export default class ScatterPlot {

  constructor(selector){
    this.margin = {
      top: 25,
      bottom: 25,
      left: 25,
      right: 25
    };

    this.width = 500;
    this.height = 500;

    this.svg = d3select(selector).append('svg')
      .attr('viewBox', `0 0 ${this.getTotalWidth()} ${this.getTotalHeight()}`)
      .attr('width', this.getTotalWidth())
      .attr('height', this.getTotalHeight())
  }

  getTotalWidth(){
    return this.width + this.margin.left + this.margin.right;
  }

  getTotalHeight(){
    return this.height + this.margin.top + this.margin.bottom;
  }

  render(){

  }

  update(){

  }

}
