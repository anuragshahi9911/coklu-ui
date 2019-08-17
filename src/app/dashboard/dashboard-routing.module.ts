import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { RootAuthGuard } from '../shared/guards/root-auth.guard';
import { ChatfeatureComponent } from '../mainpannel/maindata/chatfeature/chatfeature.component';
import { GraphComponent } from '../mainpannel/maindata/graph/graph.component';

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
