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
  public userProfileItems: Array<UserProfileItem>;
  @ViewChild('sidebar') sidebar: ElementRef;
  constructor(
    private authenticationService: AuthenticationService,
    private userService: UserService,
    private router: Router,
    public homeService: HomeService
  ) {
    if (this.authenticationService.currentUserValue) {
      this.router.navigate(['home/dashboard']);
    }
    this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
      this.currentUser = user;
    });
    this.width = window.innerWidth;
    this.hideMenu();
    let item1 = new MenuModel('Dashboard', 'nl', '', '', '/')
    let item2 = new MenuModel('Chat', '/home/dashboard/chat', '', '', 'null')
    let item3 = new MenuModel('Graph', '/home/dashboard/graph', '', '', 'null')
    let item4 = new MenuModel('Other', 'nl', '', '', '/')
    this.menuItems = [item1,item2,item3, item4];
    let user = new UserProfileItem('Anurag Shahi', '', '')
    this.userProfileItems = [user];
  }

  ngOnInit() {
    // this.loadAllUsers();
  }

  ngOnDestroy() {
    // unsubscribe to ensure no memory leaks
    this.currentUserSubscription.unsubscribe();
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
 
  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
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
