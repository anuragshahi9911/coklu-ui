import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
import { ChatfeatureComponent } from '../mainpannel/table/maindata/chatfeature/chatfeature.component';
import { RootAuthGuard } from '../shared/guards/root-auth.guard';
const route = [
  { path: '', component: DashboardHomeComponent, canActivate: [RootAuthGuard ] },
  { path: 'chat', component: ChatfeatureComponent},
];
@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
