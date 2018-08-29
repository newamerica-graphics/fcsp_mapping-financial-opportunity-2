import { select, selectAll } from 'd3-selection'
import { scaleLinear } from 'd3-scale';
import { axisLeft, axisBottom } from 'd3-axis';

export default class ScatterPlot {

  constructor(selector, settings={}, data){
    this.data = data;
    this.settings = settings;

    this.margin = {
      top: 25,
      bottom: 25,
      left: 25,
      right: 25
    };

    this.width = 500;
    this.height = 500;

    this.xScale = scaleLinear().range([0, this.width]).domain([0,1]);
    this.yScale = scaleLinear().range([this.height, 0]);
    this.rScale = scaleLinear().range([5, 25]);

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
    if(!this.data) return this;

    this.yScale.domain([
      d3.min(data, this.y),
      d3.max(data, this.y)
    ]);

    this.rScale.domain([
      d3.min(data, this.r),
      d3.max(data, this.r)
    ]);

    return this;
  }

  data = (data) => {
    this.data = data;
    return this;
  }

  y = (d) => {
    return this.settings.y ? this.settings.y(d) : d.y;
  }

  x = (d) => {
    return this.settings.x ? this.settings.x(d) : d.x;
  }

  r = (d) => {
    return this.settings.r ? this.settings.r(d) : 5;
  }

  render = (data) => {
    if(data) this.data(data);
    this.scale();
  }

  update = (data) => {
    if(data){
      this.data(data);
      this.scale();
    }

    let xAxis = axisBottom().scale(this.xScale);

    let yAxis = axisLeft().scale(this.yScale);

    this.svg.append("g")
      .attr("class", "x axis")
      .call(xAxis)

    this.svg.append("g")
        .attr("class", "y axis")
        .call(yAxis)

    this.svg.selectAll('.axis path,.axis line')
      .attr('stroke', '#333');

    this.svg.selectAll('.axis text')
      .attr('fill', '#333');

    this.plots.data(this.data)
      .enter().append("circle")
        .attr("class", "dot")
        .attr("r", d => this.rScale(this.r(d)))
        .attr("cx", (d) => this.xScale(this.x(d)))
        .attr("cy", (d) => this.yScale(this.y(d)))
        .style("fill", 'blue');

  }

}
