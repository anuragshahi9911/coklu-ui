import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { SearchEmitterModel } from './searchEmitter-model';
import { HomeService } from 'src/app/home/home.service';
import { UserService } from '../../services/user.service';
import { UserProfileItem } from './header-user-profile';

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
    public homeService: HomeService,
    public userService: UserService) {
    this.searchText = '';
  }
  public appItems: Array<any>;
  @Input() public userProfileItems: UserProfileItem;
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
  public logout() {
    this.userService.deleteToken();
    this.router.navigate(['/login']);
  }
  public editProfile() {
    this.router.navigate(['/userprofile']);
  }
}
