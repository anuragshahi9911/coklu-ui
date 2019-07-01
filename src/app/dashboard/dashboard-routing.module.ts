import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ChatfeatureComponent } from '../mainpannel/table/maindata/chatfeature/chatfeature.component';
import { RootAuthGuard } from '../shared/guards/root-auth.guard';
import { GraphComponent } from '../mainpannel/table/maindata/graph/graph.component';
const route = [
  { path: '', component: DashboardHomeComponent, canActivate: [RootAuthGuard ] },
  { path: 'chat', component: ChatfeatureComponent},
  { path: 'graph', component: GraphComponent }
];
@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
