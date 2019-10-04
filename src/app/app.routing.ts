import { Routes, RouterModule } from '@angular/router';
import { CommonModule } from '../../node_modules/@angular/common';
import { LoginComponent } from './login/login.component';
import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RootAuthGuard } from './shared/guards/root-auth.guard';
import { AlwaysAuthChildrenGuard } from './shared/guards/always-auth-children.guard';
import { UserComponent } from './user/user.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
const appRoutes: Routes = [
  { path: '', component: HomeComponent, canActivate: [RootAuthGuard] },
  {
    path: 'signup', component: UserComponent,
    children: [{ path: '', component: SignUpComponent }]
  },
  { 
    path: 'login', component: UserComponent,
    children: [{ path: '', component: SignInComponent }] 
  },
  {
    path: 'userprofile', component: UserProfileComponent,canActivate:[RootAuthGuard]
  },
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