import { Component, OnInit } from '@angular/core';
import * as firebase from 'firebase';
import { WindowService } from '../../services/window.service';
import { PhoneNumber } from './phonenumber';
import { environment } from '../../../../environments/environment';
@Component({
  selector: 'app-phone-login',
  templateUrl: './phone-login.component.html',
  styleUrls: ['./phone-login.component.scss']
})
export class PhoneLoginComponent implements OnInit {

  windowRef: any;

  phoneNumber = new PhoneNumber()

  verificationCode: string;

  user: any;

  constructor(private win: WindowService) { }

  ngOnInit() {
    this.windowRef = this.win.windowRef
    const new_fire = firebase.initializeApp(environment.firebaseConfig);
    firebase.analytics();
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container')
    this.windowRef.recaptchaVerifier.render()
  }


  sendLoginCode() {

    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = this.phoneNumber.e164;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
            .then(result => {

                this.windowRef.confirmationResult = result;

            })
            .catch( error => console.log(error) );

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
                  .confirm(this.verificationCode)
                  .then( result => {

                    this.user = result.user;

    })
    .catch( error => console.log(error, "Incorrect code entered?"));
  }



}
