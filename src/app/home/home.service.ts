import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HomeService {

  public moduleName = '';
  public isMenu = true;
  public isMenuIcon = false;
  public id: any;
  constructor() { }
}
