import { CanActivate } from '@angular/router';

export class RootAuthGuard implements CanActivate {

  public canActivate() {
    return true;
  }

}
