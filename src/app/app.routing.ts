import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '../../node_modules/@angular/common';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RootAuthGuard } from './shared/guards/root-auth.guard';
import { AlwaysAuthChildrenGuard } from './shared/guards/always-auth-children.guard';
import { UserComponent } from './user/user.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { PhoneLoginComponent } from './shared/components/phone-login/phone-login.component';
const appRoutes: Routes = [
  { path: '', 
    redirectTo: '/home',
    pathMatch: 'full',
    canActivate:[RootAuthGuard]
 },
  {
    path: 'signup', component: UserComponent  
  },
  { 
    path: 'login', component: UserComponent
  },
  {
    path: 'userprofile', component: PhoneLoginComponent
  },
  { 
    path: 'logout', component: UserComponent
  },
  {
    path: 'home', component: HomeComponent,
    canActivate: [RootAuthGuard],
    // canActivateChild: [AlwaysAuthChildrenGuard],
    children: [
      {
        path: '', loadChildren: './dashboard/dashboard.module#DashboardModule', data: {
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