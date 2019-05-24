import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable()
export class OnlyLoggedInUsersGuard implements CanActivate {

  constructor() { }

  public canActivate(
    route: ActivatedRouteSnapshot): Observable<boolean> | Promise<boolean> | boolean {
      return true;   
    }
}
