import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';
import { User } from '../shared/models/user.model';
import { Subscription } from 'rxjs';
import { AuthenticationService } from '../shared/services/authentication.service';
import { UserService } from '../shared/security/user.service';
import { first } from 'rxjs/operators';

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
  @ViewChild('sidebar') sidebar: ElementRef;
  constructor(
      private authenticationService: AuthenticationService,
      private userService: UserService,
      private router: Router
  ) {
    if (this.authenticationService.currentUserValue) { 
        this.router.navigate(['home']);
    }
      this.currentUserSubscription = this.authenticationService.currentUser.subscribe(user => {
          this.currentUser = user;
      });
  }

  ngOnInit() {
      this.loadAllUsers();
  }

  ngOnDestroy() {
      // unsubscribe to ensure no memory leaks
      this.currentUserSubscription.unsubscribe();
  }

  private deleteUser(id: number) {
      this.userService.delete(id).pipe(first()).subscribe(() => {
          this.loadAllUsers()
      });
  }
  public logout() {
    this.authenticationService.logout();
    this.router.navigate(['/']);
  }
  private loadAllUsers() {
      this.userService.getAll().pipe(first()).subscribe(users => {
          this.users = users;
      });
  }
  /* Set the width of the sidebar to 250px and the left margin of the page content to 250px */
    public  toogleNav() {
        this.sidebarFlag = this.sidebarFlag ? false : true;
    }
    
    /* Set the width of the sidebar to 0 and the left margin of the page content to 0 */
    public  closeNav() {
        this.sidebarFlag = false;
    }

}
