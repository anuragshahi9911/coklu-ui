import { Component, OnInit, ViewChild, ElementRef, ViewChildren } from '@angular/core';
import Chart from 'chart.js';
import * as CanvasJS from 'canvasjs/dist/canvasjs.min';
import { WebSocketSubject } from 'rxjs/internal/observable/dom/WebSocketSubject';
import { GraphService } from './graph.service';
import { Observable } from 'rxjs';
import { DataModel } from '../../../shared/components/charts/barchart/barchart.datamodel';
import { HttpClient } from '@angular/common/http';
@Component({
  selector: 'app-graph',
  templateUrl: './graph.component.html',
  styleUrls: ['./graph.component.scss']
})
export class GraphComponent implements OnInit {
  // socket1: WebSocketSubject<{}>;
  // socket2: WebSocketSubject<{}>;
  // socket3: WebSocketSubject<{}>;
  // public serverMessages1 = new Array<any>();
  // public serverMessages2 = new Array<any>();
  // public serverMessages3 = new Array<any>();
  // public items;
  // public selectedCurrency1: String;
  // public selectedCurrency2: String;
  // public selectedCurrency3: String;
  // // @ViewChildren("myChart") myChart1: ElementRef;
  constructor(private graphService: GraphService, private http: HttpClient) {
   /// this.socket1 = new WebSocketSubject('wss://stocksimulator.intuhire.com');
   // this.socket2 = new WebSocketSubject('wss://stocksimulator.intuhire.com');
   // this.socket3 = new WebSocketSubject('wss://stocksimulator.intuhire.com');
   this.data = this.http.get<DataModel>('./assets/data.json');

  }
  data: Observable<DataModel>;
  ngOnInit() {
    // let dataPoints = [];
    // let dpsLength = 0;
    // let chart = new CanvasJS.Chart("chartContainer", {
    //   exportEnabled: true,
    //   title: {
    //     text: "Live Chart with Data-Points from External JSON"
    //   },
    //   data: [{
    //     type: "spline",
    //     dataPoints: this.items,
    //   }]
    // });
    // this.graphService.getCurrencyPairs().subscribe((data) => {
    //   this.items = data;
  }
    // $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=1&ystart=25&length=20&type=json&callback=?", function (data) {
    //   $.each(data, function (key, value) {
    //     dataPoints.push({ x: value[0], y: parseInt(value[1]) });
    //   });
    //   dpsLength = dataPoints.length;
    //   chart.render();
    //   updateChart();
    // });
    // function updateChart() {
    //   $.getJSON("https://canvasjs.com/services/data/datapoints.php?xstart=" + (dpsLength + 1) + "&ystart=" + (dataPoints[dataPoints.length - 1].y) + "&length=1&type=json&callback=?", function (data) {
    //     $.each(data, function (key, value) {
    //       dataPoints.push({
    //         x: parseInt(value[0]),
    //         y: parseInt(value[1])
    //       });
    //       dpsLength++;
    //     });

    //     if (dataPoints.length > 20) {
    //       dataPoints.shift();
    //     }
    //     chart.render();
    //     setTimeout(function () { updateChart() }, 1000);
    //   });
    // }
  
  // ngOnInit() {
  //   this.graphService.getCurrencyPairs().subscribe((data) => {
  //     this.items = data;
  //   });
  // }
  // public changeCurrency1(value) {
  //   console.log({ "currency_name": value })
  //   this.socket1.next({ "currencyPair": value });
  //   this.refreshChart1();
  // }
  // public changeCurrency2(value) {
  //   console.log({ "currency_name": value })
  //   this.socket2.next({ "currencyPair": value });
  //   this.refreshChart2();
  // }
  // public changeCurrency3(value) {
  //   console.log({ "currency_name": value })
  //   this.socket3.next({ "currencyPair": value });
  //   this.refreshChart3();
  // }
  // public refreshChart1() {
  //   this.socket1
  //     .subscribe(
  //       (message) => {
  //         this.serverMessages1.push(message);
  //         this.loadChart1();
  //       },
  //       (err) => console.error(err),
  //       () => console.warn('Completed!')
  //     );
  // }
  // public refreshChart2() {
  //   this.socket2
  //     .subscribe(
  //       (message) => {
  //         this.serverMessages2.push(message);
  //         this.loadChart2();
  //       },
  //       (err) => console.error(err),
  //       () => console.warn('Completed!')
  //     );
  // }
  // public refreshChart3() {
  //   this.socket3
  //     .subscribe(
  //       (message) => {
  //         this.serverMessages3.push(message);
  //         this.loadChart3();
  //       },
  //       (err) => console.error(err),
  //       () => console.warn('Completed!')
  //     );
  // }
  // public loadChart1() {
  //   let elem1: Element = document.getElementById("myChart1")
  //   var ctx1 = elem1;
  //   var myChart = new Chart(ctx1, {
  //     type: 'line',
  //     data: {
  //       labels: ['t-10', 't-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1'],
  //       datasets: [{
  //         data: this.serverMessages1,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       hoverMode: 'index',
  //       stacked: false,
  //       scales: {
  //         yAxes: [{
  //           type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  //           display: true,
  //           position: 'left',
  //           yAxisID: 'y-1',
  //         }, {
  //           type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  //           display: true,
  //           position: 'right',
  //           yAxisID: 'y-2',
  //           // grid line settings
  //           gridLines: {
  //             drawOnChartArea: false, // only want the grid lines for one axis to show up
  //           },
  //         }],
  //       }
  //     }
  //   });
  // }
  // public loadChart2() {
  //   let elem2: Element = document.getElementById("myChart2")
  //   var ctx2 = elem2;
  //   var myChart = new Chart(ctx2, {
  //     type: 'line',
  //     data: {
  //       labels: ['t-10', 't-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1'],
  //       datasets: [{
  //         data: this.serverMessages2,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       hoverMode: 'index',
  //       stacked: false,
  //       scales: {
  //         yAxes: [{
  //           type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  //           display: true,
  //           position: 'left',
  //           yAxisID: 'y-1',
  //         }, {
  //           type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  //           display: true,
  //           position: 'right',
  //           yAxisID: 'y-2',
  //           // grid line settings
  //           gridLines: {
  //             drawOnChartArea: false, // only want the grid lines for one axis to show up
  //           },
  //         }],
  //       }
  //     }
  //   });
  // }
  // public loadChart3() {
  //   let elem3: Element = document.getElementById("myChart3")
  //   var ctx3 = elem3;
  //   var myChart = new Chart(ctx3, {
  //     type: 'line',
  //     data: {
  //       labels: ['t-10', 't-9', 't-8', 't-7', 't-6', 't-5', 't-4', 't-3', 't-2', 't-1'],
  //       datasets: [{
  //         data: this.serverMessages3,
  //         borderWidth: 1
  //       }]
  //     },
  //     options: {
  //       responsive: true,
  //       hoverMode: 'index',
  //       stacked: false,
  //       scales: {
  //         yAxes: [{
  //           type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  //           display: true,
  //           position: 'left',
  //           yAxisID: 'y-1',
  //         }, {
  //           type: 'linear', // only linear but allow scale type registration. This allows extensions to exist solely for log scale for instance
  //           display: true,
  //           position: 'right',
  //           yAxisID: 'y-2',
  //           // grid line settings
  //           gridLines: {
  //             drawOnChartArea: false, // only want the grid lines for one axis to show up
  //           },
  //         }],
  //       }
  //     }
  //   });
  // }
}
