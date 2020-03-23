import { Component, OnInit, Inject, Input, ChangeDetectionStrategy, ViewChild, ElementRef } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { environment } from '../../../../environments/environment';
import * as firebase from 'firebase';
import { WindowService } from '../../services/window.service';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';
import { MatSnackBar } from '@angular/material';
import { SnackbarService } from '../snackbar/snackbar.service';
import { SnackbarComponent } from '../snackbar/snackbar.component';



export interface DialogData {
  animal: string;
  name: string;
  phoneNumber: string
}

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
 

})

export class DialogComponent implements OnInit {
  isLinear = true;
  @ViewChild('recaptchacontainer') public recaptchacontainer: ElementRef;
  windowRef: any;
  phoneNumber = ''
  verificationCode: string;
  user: User;
  public label: string;
  public loginStatus: Boolean;

  constructor(public dialogRef: MatDialogRef<DialogComponent>, @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private win: WindowService,
    private userService: UserService,
   
    private _snackBar: MatSnackBar,
    private snackBarService: SnackbarService) { }
  ngOnInit() {
    this.windowRef = this.win.windowRef
    if (!firebase.apps.length) {
      firebase.initializeApp(environment.firebaseConfig);
    }
    firebase.analytics();
    this.windowRef.recaptchaVerifier = new firebase.auth.RecaptchaVerifier(this.recaptchacontainer.nativeElement)
    this.windowRef.recaptchaVerifier.render()
   
  
  }
  sendLoginCode(type: string) {
    if (type === '2') {
      this.snackBarService.saveMessage("OTP sent Agin");
      this.openSnackBar(5);
    }
    const appVerifier = this.windowRef.recaptchaVerifier;

    const num = '+91' + this.phoneNumber;

    firebase.auth().signInWithPhoneNumber(num, appVerifier)
      .then(result => {

        this.windowRef.confirmationResult = result;

      })
      .catch(error  => { 
        this.snackBarService.saveMessage(error);
        this.openSnackBar(5);
        this.dialogRef.close({status: false, message:'OTP verification can not initiated'});
      });

  }

  verifyLoginCode() {
    this.windowRef.confirmationResult
      .confirm(this.verificationCode)
      .then(result => {
        console.log(result)
        if (result.error) {
          console.log("invalid Code entered");
        } else if (result.user) {
          this.user = result.user;
          this.userService.phoneLogin = true;
          this.userService.setToken(result.user['refreshToken']);
          this.loginStatus = true;
          this.dialogRef.close({status: true, message:'OTP  verified'});
        }

      })
      .catch(error => { 
        console.log(error, "Incorrect code entered ?")
        this.snackBarService.saveMessage(error);
        this.openSnackBar(5);
        this.dialogRef.close({status: false, message:'OTP can not verified'});
      });
     
  }
  openSnackBar(duration: number) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: duration * 1000,
    });
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

}
