import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ChatfeatureComponent } from '../mainpannel/maindata/chatfeature/chatfeature.component';
import { GraphComponent } from '../mainpannel/maindata/graph/graph.component';
import { TableComponent } from '../mainpannel/table/table.component';

const route = [
  { path: '', component: DashboardHomeComponent},
  { path: 'chat', component: ChatfeatureComponent},
  { path: 'graph', component: GraphComponent },
  { path: 'table', component: TableComponent}
];
@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
