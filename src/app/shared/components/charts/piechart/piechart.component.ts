import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import * as d3 from "d3";
@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {
  @ViewChild('chart')
  private chartContainer: ElementRef;
  width = 300
  height = 300
  margin = 100
  radius;
  svg;
  color;
  pie;
  data_ready;

  // Create dummy data
  public data = { a: 9, b: 20, c: 30, d: 8, e: 12 }

  constructor() { }

  ngOnInit() {

    this.draw();

  }

  draw() {
    const element = this.chartContainer.nativeElement;
    this.radius = Math.min(this.width, this.height) / 2 - this.margin
    this.svg = d3.select(element).append('svg') 
      .append("g")
      .attr("transform", "translate(" + this.width / 2 + "," +
        this.height / 3  + ")");

    // set the color scale
    this.color = d3.scaleOrdinal()
      .domain(Object.keys(this.data))
      .range(d3.schemeDark2);

    // Compute the position of each group on the pie:
    this.pie = d3.pie()
      .value(function (d: any) { return d.value })
    
    this.data_ready = this.pie(d3.entries(this.data))

    this.svg
      .selectAll('whatever')
      .data(this.data_ready)
      .enter()
      .append('path')
      .attr('d', d3.arc()
        .innerRadius(75)         // This is the size of the donut hole
        .outerRadius(this.radius))
      .attr('fill',(d) => { return (this.color(d.data.key)) })
      .attr("stroke", "black")
      .style("stroke-width", "2px")
      .style("opacity", 0.7)
      .style("height", "300px;")
  }
}
