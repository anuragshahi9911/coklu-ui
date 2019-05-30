﻿import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from './shared/services/authentication.service';
import { User } from './shared/models/user.model';

@Component({ selector: 'app', templateUrl: 'app.component.html' })
export class AppComponent {
    currentUser: User;

    constructor(
        private router: Router,
        private authenticationService: AuthenticationService
    ) {
        this.authenticationService.currentUser.subscribe(x => this.currentUser = x);
    }
}