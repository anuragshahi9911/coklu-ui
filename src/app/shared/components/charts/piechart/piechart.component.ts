import { Component, OnInit, ViewChild, ElementRef, OnChanges, AfterViewInit } from '@angular/core';
import { DataService } from './data.service';
import { IData } from './data.interface';
import { Chart } from 'chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit   {
    title = 'app';  
    data: IData[];  
    Player = [];  
    Run = [];  
    chart = [];  
    constructor(private dataService: DataService) { }  
    
    ngOnInit() {  
      this.dataService.getData().subscribe((result: Array<IData>) => {  
        result.forEach(x => {  
          this.Player.push(x.PlayerName);  
          this.Run.push(x.Run);  
        });  
        this  
        this.chart = new Chart('canvas', {  
          type: 'pie',  
          data: {  
            labels: this.Player,  
            datasets: [  
              {  
                data: this.Run, 
                labels: this.Player,
                legend : false,
                borderColor: '#3cba9f',  
                backgroundColor: [  
                  "#3cb371",  
                  "#0000FF",  
                  "#9966FF",  
                  "#4C4CFF",  
                  "#00FFFF",  
                  "#f990a7",  
                  "#aad2ed",  
                  "#FF00FF",  
                  "Blue",  
                  "Red",  
                  "Blue"  
                ],  
                fill: true  
              }  
            ]  
          },  
          options: {  
            legend: {  
              display: true  
            },  
            scales: {  
              xAxes: [{  
                display: false  
              }],  
              yAxes: [{  
                display: false  
              }],  
            }
          }  
        });  
      });  
    } 

}
