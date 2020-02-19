import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { environment } from 'src/environments/environment';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-recovery',
  templateUrl: './recovery.component.html',
  styleUrls: ['./recovery.component.scss']
})
export class RecoveryComponent implements OnInit {

  constructor() { }
  email: string;
  ngOnInit() {
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
   }
    firebase.analytics();
  }
  resetPassword() {
    var auth = firebase.auth();
    return auth.sendPasswordResetEmail(this.email)
      .then(() => console.log("email sent"))
      .catch((error) => console.log(error))
  }
}
