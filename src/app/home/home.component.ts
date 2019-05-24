import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/_models/user';
import { Subscription } from 'rxjs';
import { first } from 'rxjs/operators';
import { AuthenticationService } from 'src/app/_services/authentication.service';
import { UserService } from 'src/app/_services/user.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  private currentUser: User;
  private currentUserSubscription: Subscription;
  private users: User[] = [];

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

}
