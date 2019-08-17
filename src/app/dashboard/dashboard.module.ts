import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { TableComponent } from '../mainpannel/table/table.component';
import { TableModule } from 'primeng/table';
import { InputTextModule, DropdownModule, MultiSelectModule, CalendarModule, DataTableModule } from 'primeng/primeng';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { SliderModule } from 'primeng/slider';
import { FormsModule } from '@angular/forms';
import { CarouselComponent } from './carousel/carousel.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import {
  MatButtonModule, MatCheckboxModule,
  MatFormFieldModule, MatInputModule, MatButtonToggleModule, MatIconModule
} from '@angular/material';
import { ChatfeatureComponent } from '../mainpannel/maindata/chatfeature/chatfeature.component';
import { GraphComponent } from '../mainpannel/maindata/graph/graph.component';
import { CardsComponent } from '../mainpannel/maindata/cards/cards.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    TableComponent,
    CarouselComponent,
    DashboardHomeComponent,
    ChatfeatureComponent,
    GraphComponent,
    CardsComponent  
  ],
  imports: [
    CommonModule,
    FormsModule,
    DashboardRoutingModule,
    TableModule,
    InputTextModule,
    ButtonModule,
    DialogModule,
    DropdownModule,
    MultiSelectModule,
    SliderModule,
    CalendarModule,
    DataTableModule,
    MatFormFieldModule,
    MatButtonModule,
    MatButtonToggleModule,
    MatIconModule,
    MatInputModule,
    MatCheckboxModule,
    SharedModule  
  ]
  
})
export class DashboardModule { }
