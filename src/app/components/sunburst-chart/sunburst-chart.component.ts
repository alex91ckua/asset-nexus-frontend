import { Component, OnInit, OnChanges, Input, ViewChild, ElementRef } from '@angular/core';
import * as d3 from 'd3';

@Component({
  selector: 'app-sunburst-chart',
  templateUrl: './sunburst-chart.component.html',
  styleUrls: ['./sunburst-chart.component.scss']
})
export class SunburstChartComponent implements OnInit {

  @Input() transitionTime: number;
  @Input() ChartData: any;

  svg;            // Top level SVG element
  g;              // SVG Group element
  width = 932;
  height = 932;
  radius = this.width / 6;
  format = d3.format(",d");
  colorsArray = [ "#5e60ce", "#48bfe3", "#64dfdf"]
  // colorsArray = ["#2E5BFF", "#8C54FF"]

  color = d3.scaleOrdinal()
      .domain([0, this.ChartData+1])
      .range(this.colorsArray)

  arc = d3.arc()
    .startAngle(d => d.x0)
    .endAngle(d => d.x1)
    .padAngle(d => Math.min((d.x1 - d.x0) / 2, 0.005))
    .padRadius(this.radius * 1.5)
    .innerRadius(d => d.y0 * this.radius)
    .outerRadius(d => Math.max(d.y0 * this.radius, d.y1 * this.radius - 1));

  partition = data => {
    const root = d3.hierarchy(data)
      .sum(d => d.value)
      .sort((a, b) => b.value - a.value);
    return d3.partition()
      .size([2 * Math.PI, root.height + 1])
      (root);
  }

  getBrightness(color) {
    var rgb = d3.rgb(color)
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1000;
  }



  constructor(private elRef: ElementRef) { 
    console.log(this.elRef.nativeElement);
  }




  ngOnInit(): void {
    this.chart();
  }

  

  chart() {
    const root = this.partition(this.ChartData);
  
    root.each(d => { d.current = d });
    
    const svg = d3.select(this.elRef.nativeElement).append('svg')
        .attr("viewBox", [0, 0, this.width, this.width])
        .style("font", "10px sans-serif");
       

    const g = svg.append("g")
        .attr("transform", `translate(${ this.width / 2},${ this.width / 2})`);
  
    const innerTitleLine1 = g.append("text")
      .data(root.ancestors())
        .attr("text-anchor", "middle")
        .style("font-size", "3em")
        .attr("dy", "-0.55em")
        .attr("fill-opacity", 1)
        .text(d => `${ (d.data.name) }`);

    const innerTitleLine2 = g.append("text")
      .data(root.ancestors())
        .attr("text-anchor", "middle")
        .style("font-size", "3em")
        .attr("dy", "0.75em")
        .attr("fill-opacity", 1)
        .text(d => `${ this.format(d.value) }`);


    const path = g.append("g")
      .selectAll("path")
      .data(root.descendants().slice(1))
      .join("path")
        .attr("fill", d => { while (d.depth > 1) d = d.parent; return this.color(d.data.name); })
        .attr("fill-opacity", d => arcVisible(d.current) ? (d.children ? 1 : 0.6) : 0)
        .attr("d", d => this.arc(d.current));
  
    path.filter(d => d.children)
        .style("cursor", "pointer")
        .on("click", clicked);
  
    path.append("title")
        .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")} \n ${ this.format(d.value) }`);
  
    const label = g.append("g")
        .attr("pointer-events", "none")
        .attr("text-anchor", "middle")
        .style("user-select", "none")
      .selectAll("text")
      .data(root.descendants().slice(1))
      .join("text")
        .attr("dy", "0.35em")
        .style("font-size", "1.5em")
        .style("fill", d => { while (d.depth > 1) d = d.parent; 
          return this.getBrightness( this.color(d.data.name) ) < 125 ? "#fff" : "#000"
        })
        .attr("fill-opacity", d => +labelVisible(d.current))
        .attr("transform", d => labelTransform(d.current))
        .text(d => d.data.name);
  
    const parent = g.append("circle")
        .datum(root)
        .attr("r", this.radius)
        .attr("fill", "none")
        .attr("pointer-events", "all")
        .on("click", clicked);

    let that = this;
    let transitionTime = this.transitionTime;

    function clicked(p) {

      parent.datum(p.parent || root);
      
      innerTitleLine1.text(`${p.data.name}`);
      innerTitleLine2.data(root.ancestors()).text(d => `${ d3.format(",d")(p.value) }` );


      root.each(d => d.target = {
        x0: Math.max(0, Math.min(1, (d.x0 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        x1: Math.max(0, Math.min(1, (d.x1 - p.x0) / (p.x1 - p.x0))) * 2 * Math.PI,
        y0: Math.max(0, d.y0 - p.depth),
        y1: Math.max(0, d.y1 - p.depth)
      });
  
      const t = g.transition().duration(transitionTime);
      
      // Transition the data on all arcs, even the ones that aren’t visible,
      // so that if this transition is interrupted, entering arcs will start
      // the next transition from the desired position.
      path.transition(t)
          .tween("data", d => {
            const i = d3.interpolate(d.current, d.target);
            return t => d.current = i(t);
          })
        .filter(function(d) {
          return +this.getAttribute("fill-opacity") || arcVisible(d.target);
        })
          .attr("fill-opacity", d => arcVisible(d.target) ? (d.children ? 1 : 0.6) : 0)
          .attrTween("d", d => () => that.arc(d.current));
  
      label.filter(function(d) {
          return +this.getAttribute("fill-opacity") || labelVisible(d.target);
        }).transition(t)
          .attr("fill-opacity", d => +labelVisible(d.target))
          .attrTween("transform", d => () => labelTransform(d.current));
    }
    
    function arcVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && d.x1 > d.x0;
    }
  
    function labelVisible(d) {
      return d.y1 <= 3 && d.y0 >= 1 && (d.y1 - d.y0) * (d.x1 - d.x0) > 0.03;
    }
  
    function labelTransform(d) {
      const x = (d.x0 + d.x1) / 2 * 180 / Math.PI;
      const y = (d.y0 + d.y1) / 2 * 155;
      return `rotate(${x - 90}) translate(${y},0) rotate(${x < 180 ? 0 : 180})`;
    }
  
    return svg.node();
  }


  
}
