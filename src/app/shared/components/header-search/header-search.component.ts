import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SearchEmitterModel } from './searchEmitter-model';
import { HomeService } from 'src/app/home/home.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'app-header-search',
  templateUrl: './header-search.component.html',
  styleUrls: ['./header-search.component.scss']
})
export class HeaderSearchComponent implements OnInit {

  // public showSearch = true;
  public searchText: any;
  public eventEmitterModel: SearchEmitterModel;


  @Output()
  keyUpHandler: EventEmitter<string> = new EventEmitter();
  public userName = '';
  public userImage = '';
  isMenu: boolean;

  constructor(
    public router: Router,
    public homeService: HomeService) {
    this.searchText = '';
  }
  public appItems: Array<any>;
  @Input() public userProfileItems;
  public controlPanelApp: any;
  public accountApp: any;

  ngOnInit() {
  }

  private keyUpSearch(event: any) {
    
  }
  public clearSearch() {
  }
  public menuIcon() {
    if (this.homeService.isMenu) {
      this.homeService.isMenu = false;
    } else {
      this.homeService.isMenu = true;
    }
  }
}
