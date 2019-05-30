import { CanDeactivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Component } from '@angular/core';

export class DeactivateGuard implements CanDeactivate<any> {

  public canDeactivate(component: Component,
    route: ActivatedRouteSnapshot,
    currentState: RouterStateSnapshot,
    nextState: RouterStateSnapshot): boolean {
    return true;
  }

}
