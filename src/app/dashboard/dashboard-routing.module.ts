import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { DashboardHomeComponent } from './dashboard-home/dashboard-home.component';
const route = [
  { path: '', component: DashboardHomeComponent },
  { path: '/*', component: DashboardHomeComponent}
];
@NgModule({
  imports: [
    RouterModule.forChild(route)
  ],
  exports: [RouterModule]
})
export class DashboardRoutingModule { }
