import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/components/alerts/alert.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SnackbarComponent } from '../shared/components/snackbar/snackbar.component';
import { SnackbarService } from '../shared/components/snackbar/snackbar.service';
import { trigger, state, style, transition, animate, keyframes } from '@angular/animations';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss'],
  })
export class UserComponent implements OnInit {

  @ViewChild('container') container:ElementRef;
  @ViewChild('signIn') signIn: ElementRef
  @ViewChild('signUpForm') public signUpForm: NgForm;
  @ViewChild('signInForm') public signInForm: NgForm;
  constructor(private renderer: Renderer2,
              private el: ElementRef,
              private userService: UserService,
              private router: Router,
              private alert: AlertService,
              private _snackBar: MatSnackBar,
              private snackBarService: SnackbarService) { }

  ngOnInit() {
   
  }
  model ={
    email :'',
    password:''
   
  };
  selectedUser = {
    fullName: '',
    email: '',
    password: ''
  };
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  serverErrorMessages: string;
  showSucessMessage: boolean;
  onSignIn(form : NgForm){
    this.userService.login(form.value).subscribe(
      res => {
        this.userService.setToken(res['token']);
        this.router.navigateByUrl('/home');
      },
      err => {
       // this.renderer.addClass(this.signIn.nativeElement, 'errorShake');
       // this.renderer.removeClass(this.signIn.nativeElement, 'errorShake');

        this.serverErrorMessages = err.error.message;
        this.snackBarService.saveMessage(this.serverErrorMessages);
        this.openSnackBar(5);
         this.resetForm(form);
      }
    );
  }
  signInErrorShakeCheck() {
    if (!this.model.email && !this.model.password) {
      this.signInForm.resetForm();

    }
  }
  signUpErrorShakeCheck() {
    if (!this.selectedUser.email && !this.selectedUser.password && !this.selectedUser.fullName) {
      this.signUpForm.resetForm();

    }
  }
  signup() {
    this.renderer.addClass(this.container.nativeElement, 'right-panel-active');
    this.signInForm.resetForm();
   // this.router.navigateByUrl('/signup');
  }
  signin() {
    this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
    this.signUpForm.resetForm();
    
  }
  onSignup(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.snackBarService.saveMessage("Sign Up success, Kindly login using your crediential");
        this.signin();
        this.openSnackBar(5);
      },
      err => {
        if (err.status === 422) {
          this.resetForm(form);
          this.snackBarService.saveMessage(err.error);
          this.openSnackBar(5);
         
         // this.renderer.addClass(this.form.nativeElement, 'ng-invalid');  
          // setTimeout(function(){
          //   this.renderer.removeClass(this.signUpForm.nativeElement, 'ng-invalid');
          // },3000);
        }
        else  
          this.snackBarService.saveMessage("Something went wrong.Please contact admin");
          this.openSnackBar(5);
      }
    );
  }
  openSnackBar(duration: number) {
    this._snackBar.openFromComponent(SnackbarComponent, {
      duration: duration * 1000,
    });
  }
  resetForm(form: NgForm) {
    this.selectedUser = {
      fullName: '',
      email: '',
      password: ''
    };
    form.resetForm();
    this.serverErrorMessages = '';
  }
}
