import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '../../node_modules/@angular/common';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RootAuthGuard } from './shared/guards/root-auth.guard';
import { AlwaysAuthChildrenGuard } from './shared/guards/always-auth-children.guard';
const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RootAuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'logout', component: LoginComponent },
  {
    path: 'home', component: HomeComponent,
    canActivate: [RootAuthGuard],
    canActivateChild: [AlwaysAuthChildrenGuard],
    children: [
      {
        path: 'dashboard', loadChildren: './dashboard/dashboard.module#DashboardModule', data: {
          title: 'Home'
        },
      }
    ]
  },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes),
    CommonModule,
  ],
  exports: [RouterModule],
  providers: [AlwaysAuthChildrenGuard]
})
export class AppRoutingModule { }