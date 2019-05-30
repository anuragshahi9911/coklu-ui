import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { UserService } from '../security/user.service';
import { NavigationService } from '../services/navigation.service';
import { Observable } from 'rxjs/internal/Observable';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor(private userService: UserService,
    private navService: NavigationService) { }

  public canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      if (this.userService.isAuthenticatedUser()) {
        return true;
      } else {
        return false;
      }
    }
}
