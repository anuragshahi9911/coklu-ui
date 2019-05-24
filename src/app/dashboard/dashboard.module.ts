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
import { BreadcrumbComponent } from '../home/breadcrumb/breadcrumb.component';
import { CarouselComponent } from './carousel/carousel.component';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';

@NgModule({
  declarations: [TableComponent, CarouselComponent, DashboardHomeComponent],
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
    DataTableModule   
  ]
})
export class DashboardModule { }
