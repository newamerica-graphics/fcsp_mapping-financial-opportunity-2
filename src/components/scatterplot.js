import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';
import { min, max } from 'd3-array';
import { format } from 'd3-format';
import { transition, Transition } from 'd3-transition';

export default class ScatterPlot {

  constructor(selector, settings={}, data){
    this._data = data;
    this.settings = settings;

    this.margin = {
      top: 25,
      bottom: 25,
      left: 25,
      right: 25
    };

    this.width = 500;
    this.height = 500;

    this.xScale = scaleLinear().range([0, this.width]);
    this.yScale = scaleLinear().range([this.height, 0]);
    this.rScale = scaleLinear().range([5, 25]);

    this.xAxis = null;
    this.yAxis = null;

    this.svg = select(selector).append('svg')
      .attr('viewBox', `0 0 ${this.getTotalWidth()} ${this.getTotalHeight()}`)
      .attr('width', this.getTotalWidth())
      .attr('height', this.getTotalHeight());

    this.svg = this.svg.append('g')
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    this.plots = this.svg.selectAll('.plot');
  }

  getTotalWidth = () => {
    return this.width + this.margin.left + this.margin.right;
  }

  getTotalHeight = () => {
    return this.height + this.margin.top + this.margin.bottom;
  }

  scale = () => {
    if(!this._data) return this;

    this.xScale.domain([
      min(this._data, this.x),
      max(this._data, this.x)
    ]);

    this.yScale.domain([
      min(this._data, this.y),
      max(this._data, this.y)
    ]);

    this.rScale.domain([
      min(this._data, this.r),
      max(this._data, this.r)
    ]);

    return this;
  }

  data = (data) => {
    this._data = data;
    return this;
  }

  y = (d) => {
    if(typeof(d) === 'function'){
      this.settings.y = d;
      return this;
    }
    return this.settings.y ? this.settings.y(d) : d.y;
  }

  x = (d) => {
    if(typeof(d) === 'function'){
      this.settings.x = d;
      return this;
    }
    return this.settings.x ? this.settings.x(d) : d.x;
  }

  r = (d) => {
    if(typeof(d) === 'function'){
      this.settings.r = d;
      return this;
    }
    return this.settings.r ? this.settings.r(d) : 5;
  }

  mouseenter = (d) => {
    this.settings.mouseenter ? this.settings.mouseenter(d) : null;
  }

  render = (data) => {
    if(data) this.data(data);

    this.scale();

    this.xAxis = axisBottom().scale(this.xScale)
      .tickFormat(format('.0%'))
      .tickSize(10)
      //.tickSize(-this.height);

    this.yAxis = axisLeft().scale(this.yScale)
      .tickSize(5)
      //.tickSize(-this.width);

    this.svg.append("g")
      .attr('transform', `translate(0, ${this.height})`)
      .attr("class", "x axis")
      .call(this.xAxis)

    this.svg.append("g")
        .attr("class", "y axis")
        .call(this.yAxis)

    this.svg.selectAll('.axis path')
      .attr('stroke', '#333');

    this.svg.selectAll('.axis line')
      .attr('stroke', '#rgba(0,0,0,0)');

    this.svg.selectAll('.axis text')
      .attr('fill', '#333')
      .attr('font-family', 'Circular');

    this.plots.data(this._data).enter().append("circle")
        .attr("class", "dot")
        .attr("r", d => this.rScale(this.r(d)))
        .attr("cx", (d) => this.xScale(this.x(d)))
        .attr("cy", (d) => this.yScale(this.y(d)))
        .attr('stroke', 'rgba(51,51,51,0.25)')
        .on('mouseenter', this.mouseenter)
        .style("fill", '#22c8a3')
        .style('opacity', '0.8');

    return this;
  }

  update = () => {
    this.scale();

    this.xAxis.scale(this.xScale);
    this.yAxis.scale(this.yScale);

    this.svg.select('.x')
      .transition()
      .call(this.xAxis);

    this.svg.select('.y')
      .transition()
      .call(this.yAxis);

    this.svg.selectAll('circle')
      .transition()
      .attr("r", d => this.rScale(this.r(d)))
      .attr("cx", (d) => this.xScale(this.x(d)))
      .attr("cy", (d) => this.yScale(this.y(d)));
  }

}
