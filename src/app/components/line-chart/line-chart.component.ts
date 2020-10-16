import {
  Component,
  OnInit,
  AfterContentInit,
  Input,
  ElementRef,
  ViewEncapsulation,
  SimpleChanges,
} from "@angular/core";
import * as d3 from "d3";
import * as d32 from "d3-line-chunked";

@Component({
  selector: "app-line-chart",
  templateUrl: "./line-chart.component.html",
  styleUrls: ["./line-chart.component.scss"],
  encapsulation: ViewEncapsulation.None,
})
export class LineChartComponent implements OnInit {
  //Decorators
  @Input() transitionTime: number;
  @Input() ChartData: any;
  @Input() Selection: string;
  @Input() opacitySelection: any;

  //Initialisers
  hostElement;

  //Chart Config
  margin = { top: 0, right: 100, bottom: 0, left: 0 };
  width = 1124 - this.margin.left - this.margin.right;
  height = 300 - this.margin.top - this.margin.bottom;
  parse = d3.timeParse("%m/%d/%Y");
  // colorsArray = ["#7400b8", "#5e60ce", "#48bfe3", "#64dfdf", "#80ffdb"]
  // colorsArray = ["red", "green", "blue"]
  colorsArray = ["#2E5BFF", "#8C54FF"];
  // colorsOrg = d3.scaleOrdinal(d3.schemeCategory10);
  // colorsFull = d3.scaleOrdinal(["#7400b8","#6930c3","#5e60ce","#5390d9","#4ea8de","#48bfe3","#56cfe1","#64dfdf","#72efdd","#80ffdb"]);
  colors = d3.scaleOrdinal(this.colorsArray);

  svg = d3.select("#linechart");
  Ydomain = [];
  Xdomain = [];
  representedValues = [];
  yScale;
  xScale;
  yAxis;
  xAxis;
  lineGen = d3
    .line()
    .x((d) => this.xScale(this.parse(d.date)))
    .y((d) => this.yScale(d.value));
  t = d3.transition().duration(750).ease(d3.easeLinear);

  // Data
  data;
  displayPath;
  dataGroup = "Assets";
  dataBranch = "Property";

  margin2 = { top: 380, right: 150, bottom: 0, left: 30 };
  height2 = 100;
  xAxis2;
  //xscale
  xScale2;
  //yscale
  yScale2;

  lineGen2 = d3
    .line()
    .curve(d3.curveLinear)
    .x((d) => this.xScale2(this.parse(d.date)))
    .y((d) => this.yScale2(d.value));

  area = d3
    .area()
    .curve(d3.curveLinear)
    .x((d) => this.xScale2(this.parse(d.date)))
    .y0(this.height2)
    .y1((d) => this.yScale2(d.value));

  dashValuePrev = true;
  dashValueCurrent = false;

  constructor(private elRef: ElementRef) {
    this.hostElement = this.elRef.nativeElement;
  }

  ngOnChanges(changes: SimpleChanges) {
    if (typeof this.Selection === "string") {
      this.displayPath = this.Selection.split("/");
      this.dataGroup = this.displayPath[0];
      this.dataBranch = this.displayPath[1];
    } else {
      this.dataGroup = "Assets";
      this.dataBranch = "Property";
    }

    this.updateChart(this.ChartData, this.dataGroup, this.dataBranch);
  }

  ngOnInit() {
    this.createChart(this.ChartData, this.dataGroup, this.dataBranch);
  }

  createChart(data, dataGroup, dataBranch) {
    // Domain scale function - TODO
    data[dataGroup][0][dataBranch].map((displayGroupItems) => {
      displayGroupItems.values.forEach((displayGroupItemValues) => {
        this.Ydomain.push(displayGroupItemValues.value);
        this.Xdomain.push(this.parse(displayGroupItemValues.date));
      });
    });

    const svg = d3
      .select("#linechart")
      .attr("width", "100%")
      .attr("height", "100%")
      .attr("viewBox", "0 0 " + 1024 + " " + 768)
      .append("g")
      .attr("class", "lines")
      .attr("transform", "translate(" + 30 + ", " + this.margin.top + ")");

    this.xScale = d3
      .scaleTime()
      .range([30, this.width - this.margin.left])
      .domain(d3.extent(this.Xdomain));

    this.yScale = d3
      .scaleLinear()
      .range([this.height - 20, 20])
      .domain(d3.extent(this.Ydomain))
      .nice();

    this.xAxis = svg
      .append("g")
      .attr("class", "xaxis axis")
      .attr("transform", "translate(0," + this.height + ")")
      .call(d3.axisBottom(this.xScale));

    this.yAxis = svg
      .append("g")
      .attr("class", "yaxis axis")
      .attr("transform", "translate(30,0)")
      .call(d3.axisLeft(this.yScale));

    // AXIS Labels
    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", this.width - 30)
      .attr("y", this.height2 + this.margin2.top + 45)
      .text("Full Date Range (year)");

    svg
      .append("text")
      .attr("class", "x label")
      .attr("text-anchor", "end")
      .attr("x", this.width - 30)
      .attr("y", this.height + 45)
      .text("Date (day/month/year)");

    svg
      .append("text")
      .attr("class", "y label")
      .attr("text-anchor", "end")
      .attr("x", -20)
      .attr("y", -25)
      .attr("dy", ".75em")
      .attr("transform", "rotate(-90)")
      .text("Value (£/k)");

    const contextlineGroups = svg
      .append("g")
      .attr("class", "context")
      .attr("transform", "translate(" + 0 + "," + this.margin2.top + ")");

    var context = contextlineGroups.selectAll("g");

    this.xAxis2 = svg
      .append("g")
      .attr("class", "xaxis2 axis")
      .attr(
        "transform",
        "translate(0," + (this.margin2.top + this.height2) + ")"
      )
      .call(d3.axisBottom(this.xScale));

    const chartLegend = d3.select("#linechart g.lines").append("g");

    chartLegend
      .append("line")
      .attr("x1", this.width - 290)
      .attr("y1", 28)
      .attr("x2", this.width - 250)
      .attr("y2", 28)
      .attr("stroke", "#8097B1")
      .attr("stroke-width", "2px")
      .style("fill", "none");
    chartLegend
      .append("text")
      .attr("x", this.width - 245)
      .attr("y", 32)
      .text("Validated")
      .style("fill", "#8097B1");

    chartLegend
      .append("line")
      .attr("x1", this.width - 160)
      .attr("y1", 28)
      .attr("x2", this.width - 120)
      .attr("y2", 28)
      .attr("stroke", "#8097B1")
      .attr("stroke-width", "2px")
      .style("stroke-dasharray", "8,8")
      .style("fill", "none");
    chartLegend
      .append("text")
      .attr("x", this.width - 115)
      .attr("y", 32)
      .text("Unvalidated")
      .style("fill", "#8097B1");

    // Applys data to plot area
    this.updateChart(data, dataGroup, dataBranch);
  }

  updateChart(data, dataGroup, dataBranch) {
    this.Ydomain = [];
    this.Xdomain = [];
    this.representedValues = [];

    // Domain scale function - TODO
    data[dataGroup][0][dataBranch].map((displayGroupItems, i) => {
      displayGroupItems.color = this.colors(i);
      displayGroupItems.values.forEach((displayGroupItemValues) => {
        this.Ydomain.push(displayGroupItemValues.value);
        this.Xdomain.push(this.parse(displayGroupItemValues.date));
        displayGroupItemValues.color = this.colors(i);
        displayGroupItemValues.opacity = displayGroupItems.opacity;
        this.representedValues.push(displayGroupItemValues);
      });
    });

    this.yScale = d3
      .scaleLinear()
      .range([this.height, 20])
      .domain([0, d3.max(this.Ydomain)])
      .nice();

    this.xScale = d3
      .scaleTime()
      .range([30, this.width - this.margin.left - 125])
      .domain(d3.extent(this.Xdomain));

    d3.select("g.yaxis").transition(100).call(d3.axisLeft(this.yScale));
    d3.select("g.xaxis").call(d3.axisBottom(this.xScale));

    d3.select("#linechart g.lines").selectAll(".grid").remove(); // clears grid when updating data ??

    const gridHorizontal = d3
      .select("#linechart g.lines")
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(0," + this.height + ")")
      .style("stroke-dasharray", "5,5")
      .call(
        d3
          .axisBottom(this.xScale)
          .ticks(10)
          .tickSize(-this.height + 20)
          .tickFormat("")
      );
    gridHorizontal
      .selectAll("line")
      .attr("stroke", "#8097B1")
      .attr("opacity", 0.3);

    const gridVertical = d3
      .select("#linechart g.lines")
      .append("g")
      .attr("class", "grid")
      .attr("transform", "translate(30,0)")
      .style("stroke-dasharray", "5,5")
      .call(
        d3
          .axisLeft(this.yScale)
          .ticks(4)
          .tickSize(-this.width + 40)
          .tickFormat("")
      );

    gridVertical
      .selectAll("line, path")
      .attr("stroke", "#8097B1")
      .attr("opacity", 0.3);

    var lineWithDefinedTrue = d3
      .line()
      .curve(d3.curveLinear)
      .x((d) => this.xScale(this.parse(d.date)))
      .y((d) => this.yScale(d.value));

    var lineWithDefinedFalse = d3
      .line()
      .curve(d3.curveLinear)
      .x((d) => this.xScale(this.parse(d.date)))
      .y((d) => this.yScale(d.value))
      .defined((d, i) => {
        return (
          d.verified === false ||
          d.nextEntryVerified === false ||
          d.prevEntryVerified === false
        );
      });

    var areaWithDefinedTrue = d3
      .area()
      .curve(d3.curveLinear)
      .x((d) => this.xScale(this.parse(d.date)))
      .y0(this.height)
      .y1((d) => this.yScale(d.value));

    var valuePaths = d3.select("#linechart g.lines").selectAll(".lineElements");
    valuePaths.data(data[dataGroup][0][dataBranch]).join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "lineElements")
          .attr("fill", "none")
          .attr("d", (d) => lineWithDefinedTrue(d.values))
          .attr("opacity", (d) => d.opacity)
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("filter", "url(#dropshadow)")
          .attr("stroke", (d, i) => this.colors(i))
          .attr("stroke-width", "2px")
          .style("stroke-dasharray", "5,5")
          .call((enter) => enter.transition(this.t)),
      (update) =>
        update
          .attr("stroke", (d, i) => this.colors(i))
          .attr("opacity", (d) => d.opacity)
          .attr("d", (d) => lineWithDefinedTrue(d.values))
          .call((update) => update.transition(this.t)),
      (exit) => exit.call((exit) => exit.transition(this.t)).remove()
    );

    var valueAreas = d3.select("#linechart g.lines").selectAll(".AreaElements");
    valueAreas.data(data[dataGroup][0][dataBranch]).join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "AreaElements")
          .attr("fill", (d, i) => this.colors(i))
          .attr("d", (d) => areaWithDefinedTrue(d.values))
          .attr("opacity", (d) => {
            return d.opacity === 1 ? 0.2 : 0;
          })
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("stroke", (d, i) => this.colors(i))
          .call((enter) => enter.transition(this.t)),
      (update) =>
        update
          .attr("stroke", (d, i) => this.colors(i))
          .attr("opacity", (d) => {
            return d.opacity === 1 ? 0.2 : 0;
          })
          .attr("d", (d) => areaWithDefinedTrue(d.values))
          .call((update) => update.transition(this.t)),
      (exit) => exit.call((exit) => exit.transition(this.t)).remove()
    );

    var valuePointLines = d3
      .select("#linechart g.lines")
      .selectAll(".valuePointLines");

    valuePointLines.data(this.representedValues).join(
      (enter) =>
        enter
          .append("line")
          .attr("class", "valuePointLines")
          .style("clip-path", "url(#clip)") //<-- apply clipping
          .attr("fill", "none")
          .attr("opacity", (d) => {
            return d.verified === false ? 1 : 0;
          })
          .attr("filter", "url(#dropshadow)")
          .attr("stroke", (d, i) => d.color)
          .style("stroke-width", 1.5)
          .attr("x1", (d) => {
            return this.xScale(this.parse(d.date));
          })
          .attr("y1", 0)
          .attr("x2", (d) => {
            return this.xScale(this.parse(d.date));
          })
          .attr("y2", (d) => {
            return this.yScale(d.value);
          })
          .call((enter) => enter.transition(this.t)),
      (update) =>
        update
          .attr("opacity", (d) => {
            return d.verified === true && d.opacity === 1 ? 1 : 0;
          })
          .call((update) => update.transition(this.t)),
      (exit) => exit.call((exit) => exit.transition(this.t)).remove()
    );

    var div = d3
      .select("body")
      .append("div")
      .attr("class", "tooltip-donut")
      .style("opacity", 0);

    var valuePoints = d3.select("#linechart g.lines").selectAll(".points");

    valuePoints.data(this.representedValues).join(
      (enter) =>
        enter
          .append("circle")
          .attr("class", "points")
          // .style('clip-path', 'url(#clip)') //<-- apply clipping
          .style("fill", (d, i) => {
            return d.verified === true ? d.color : "#fff8ee";
          })
          .attr("opacity", (d) => {
            return d.opacity === 1 ? 1 : 0;
          })
          .style("stroke", (d, i) => d.color) // set the line colour
          .style("stroke-width", (d, i) => {
            return d.verified === true ? 3.5 : 4.5;
          })
          .style("r", (d, i) => {
            return d.verified === true ? 4 : 6;
          })
          .attr("cx", (d) => {
            return this.xScale(this.parse(d.date));
          })
          .attr("cy", (d) => {
            return this.yScale(d.value);
          })
          .on("mouseover", function (d, i) {
            if (d.opacity === 1) {
              div.transition().duration(50).style("opacity", 1);

              let tipValue =
                "<strong>Value</strong>: " +
                d.value +
                "<br/> Date: " +
                d.date +
                "<br /> Verified: <em>" +
                d.verified +
                "</em>";

              div
                .html(tipValue)
                .style("left", d3.event.pageX + 10 + "px")
                .style("top", d3.event.pageY - 15 + "px");
            }
          })
          .on("mouseout", function (d, i) {
            div.transition().duration("50").style("opacity", 0);
          })
          .call((enter) => enter.transition(this.t)),
      (update) =>
        update
          .attr("opacity", (d) => {
            return d.opacity === 1 ? 1 : 0;
          })
          .attr("cx", (d) => {
            return this.xScale(this.parse(d.date));
          })
          .attr("cy", (d) => {
            return this.yScale(d.value);
          })
          .call((update) => update.transition(this.t)),
      (exit) => exit.call((exit) => exit.transition(this.t)).remove()
    );

    this.xScale2 = d3
      .scaleTime()
      .range([30, this.width - this.margin.left])
      .domain(d3.extent(this.Xdomain));

    this.yScale2 = d3
      .scaleLinear()
      .range([this.height2 - 20, 20])
      .domain(d3.extent(this.Ydomain));

    var context = d3
      .select("#linechart g.context")
      .selectAll(".lineElementsContext");

    context.data(data[dataGroup][0][dataBranch]).join(
      (enter) =>
        enter
          .append("path")
          .attr("class", "lineElementsContext")
          .attr("fill", () => {
            var mid = this.colorsArray.length / 2;
            return this.colorsArray[Math.round(mid) - 1];
          })
          .attr("opacity", "0.2")
          .attr("d", (d) => this.area(d.values))
          .call((enter) => enter.transition(this.t)),
      (update) =>
        update
          .attr("opacity", "0.2")
          .call((update) =>
            update.transition(this.t).attr("d", (d) => this.area(d.values))
          ),
      (exit) => exit.call((exit) => exit.transition(this.t)).remove()
    );

    var brush = d3
      .brushX()
      .extent([
        [30, 0],
        [this.width - 20, this.height2],
      ])
      .on("brush end", brushed.bind(this));

    var context2 = d3.select("#linechart g.context");

    d3.select("#linechart")
      .append("defs")
      .append("clipPath")
      .attr("id", "clip")
      .append("rect")
      .attr("width", this.width - 40)
      .attr("height", this.height)
      .attr("transform", "translate(30,0)");

    d3.select("#linechart .brush").remove(); // clears brush scrolling element

    context2
      .append("g")
      .attr("class", "brush")
      .attr("width", 100)
      .call(brush)
      .call(brush.move, [
        (this.xScale2.range()[1] / 5) * 2,
        (this.xScale2.range()[1] / 5) * 3,
      ]);

    function brushed() {
      let extent = d3.event.selection;
      let xsDomain = extent.map(this.xScale2.invert, this.xScale2);
      this.xScale.domain(xsDomain);

      d3.select("#linechart g.lines")
        .selectAll(".points")
        .attr("cx", (d) => {
          return this.xScale(this.parse(d.date));
        })
        .attr("cy", (d) => {
          return this.yScale(d.value);
        })
        .style("fill", (d, i) => {
          return d.verified === false ? d.color : "#fff8ee";
        })
        .attr("opacity", (d) => {
          return d.opacity === 1 ? 1 : 0;
        })
        .style("stroke", (d, i) => d.color) // set the line colour
        .style("stroke-width", (d, i) => {
          return d.verified === false ? 3.5 : 4.5;
        })
        .style("r", (d, i) => {
          return d.verified === false ? 4 : 6;
        });

      d3.select("#linechart g.lines")
        .selectAll(".valuePointLines")
        .attr("x1", (d) => {
          return this.xScale(this.parse(d.date));
        })
        .attr("y1", (d) => {
          return this.yScale(d.value);
        })
        .attr("x2", (d) => {
          return this.xScale(this.parse(d.date));
        })
        .attr("y2", this.height);

      d3.select("#linechart g.lines")
        .selectAll(".AreaElements")
        .attr("d", (d) => areaWithDefinedTrue(d.values));
      d3.select("#linechart g.lines")
        .selectAll(".lineElements")
        .attr("d", (d) => lineWithDefinedTrue(d.values));
      // d3.select("#linechart g.lines").selectAll(".lineElementsDashed").attr("d", d => lineWithDefinedFalse(d.values))
      d3.select(".xaxis").call(d3.axisBottom(this.xScale));

      //This is to scale the y axis. However, this is not desired as when the chart brushes there may be times when there is no data within a brush zone.
      //This means all data dissapears from the chart. Not ideal.

      // let dataFiltered = [];
      // data[dataGroup][0][dataBranch].forEach(displayGroupItems => {
      //   displayGroupItems.values.forEach((displayGroupItemValues) => {
      //     if ((this.parse(displayGroupItemValues.date) >= xScaleDomain[0]) && (this.parse(displayGroupItemValues.date) <= xScaleDomain[1])) {
      //       dataFiltered.push(displayGroupItemValues.value);
      //     };
      //   })
      // })

      // this.yScale3 = d3.scaleLinear()
      //   .range([this.height - 20, 20])
      //   .domain(d3.extent(dataFiltered));

      // this.yScale3.domain(d3.extent(dataFiltered));

      // d3.select("g.yaxis").transition(50)
      //   .call(d3.axisLeft(this.yScale3));
    }
  }
}
