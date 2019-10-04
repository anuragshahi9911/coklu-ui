import { CanActivate, Router, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { AuthenticationService } from '../services/authentication.service';
import { Injectable } from '@angular/core';
import { UserService } from '../services/user.service';

@Injectable({ providedIn: 'root' })
export class RootAuthGuard implements CanActivate {
    constructor(private userService : UserService,private router : Router){}
 
    canActivate(
      next: ActivatedRouteSnapshot,
      state: RouterStateSnapshot): boolean {
        if (!this.userService.isLoggedIn()) {
          this.router.navigateByUrl('/login');
          this.userService.deleteToken();
          return false;
        }
      return true;
    }

}
