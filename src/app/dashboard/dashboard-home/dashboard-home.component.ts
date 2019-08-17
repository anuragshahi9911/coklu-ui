import { Component, OnInit } from '@angular/core';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-dashboard-home',
  templateUrl: './dashboard-home.component.html',
  styleUrls: ['./dashboard-home.component.scss']
})
export class DashboardHomeComponent implements OnInit {

  constructor() { }
  private items: MenuItem[];
    
  ngOnInit() {
      this.items = [
          {label:'Categories'},
          {label:'Sports'},
          {label:'Football'},
          {label:'Countries'},
          {label:'Spain'},
          {label:'F.C. Barcelona'},
          {label:'Squad'},
          {label:'Lionel Messi', url: 'https://en.wikipedia.org/wiki/Lionel_Messi'}
      ];
  }

}
