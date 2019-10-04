import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs/internal/Observable';
import { UserService } from '../services/user.service';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor(private userService: UserService,
    ) { }

  public canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.userService.isLoggedIn()) {
        return true;
      } else {
        return false; 
      }
    }
}
