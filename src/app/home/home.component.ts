import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { first } from 'rxjs/operators';
import { MenuModel } from '../shared/models/menu.model';
import { UserProfileItem } from '../shared/components/header-search/header-user-profile';
import { HomeService } from './home.service';
import { UserService } from '../shared/services/user.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private currentUser: User;
  private currentUserSubscription: Subscription;
  private users: User[] = [];
  public sidebarFlag = false;
  public width: Number;
  public menuItems: Array<MenuModel>;
  public userProfileItems: UserProfileItem;
  @ViewChild('sidebar') sidebar: ElementRef;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public homeService: HomeService
  ) {
    if (localStorage.getItem('currentUser')) {    
      const currentUser = JSON.parse(localStorage.getItem('currentUser'))
        this.userProfileItems = new UserProfileItem(currentUser.fullName,'','');
    }
    
    this.width = window.innerWidth;
    this.hideMenu();
    let item1 = new MenuModel('Dashboard', '/home', '', '', '/')
    let item2 = new MenuModel('Chat', '/home/chat', '', '', 'null')
    let item3 = new MenuModel('Graph', '/home/graph', '', '', 'null')
    let item4 = new MenuModel('Table', '/home/table', '', '', 'null')
    this.menuItems = [item1,item2,item3, item4];
    
  }

  ngOnInit() {
    // this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
  }
  onResize(event) {
    this.width = event.target.innerWidth;
  }
  hideMenu() {
    if (this.width <= 992) {
      this.homeService.isMenu = false;
      this.homeService.isMenuIcon = true;
    } else {
      this.homeService.isMenu = true;
      this.homeService.isMenuIcon = false;
    }
  }
 
  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
  public toogleNav() {
    this.sidebarFlag = this.sidebarFlag ? false : true;
  }

  /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
  public closeNav() {
    this.sidebarFlag = false;
  }

}
