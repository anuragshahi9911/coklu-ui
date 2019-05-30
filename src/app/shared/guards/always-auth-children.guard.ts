import { Injectable } from '@angular/core';
import { CanActivateChild, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { UserService } from '../security/user.service';
import { NavigationService } from '../services/navigation.service';
import { Observable } from 'rxjs/internal/Observable';


@Injectable()
export class AlwaysAuthChildrenGuard implements CanActivateChild {
  constructor(private userService: UserService,
    private navService: NavigationService) { }
    public canActivateChild(
      route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;
    }
}
