import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '../../node_modules/@angular/common';
import { AuthGuard } from './_guards';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

import { TableComponent } from './mainpannel/table/table.component';
import { OnlyLoggedInUsersGuard } from './_guards/only-loggedin-users.guard';
import { AlwaysAuthChildrenGuard } from './_guards/always-auth-children.guard';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', redirectTo: '/home', pathMatch: 'full' },
  { path: 'dashboard', redirectTo: '/home/dashboard', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [AuthGuard ],
    canActivateChild: [AlwaysAuthChildrenGuard],

    children: [
      {
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: {
          title: 'Home'
        }
      }  
    ]
  },
  { path: '**', component: HomeComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
    CommonModule,
  ],
  exports: [RouterModule],
  providers: [AlwaysAuthChildrenGuard]
})
export class AppRoutingModule { }