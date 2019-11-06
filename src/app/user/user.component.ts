import { Component, OnInit, ElementRef, Renderer2, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { UserService } from '../shared/services/user.service';
import { Router } from '@angular/router';
import { AlertService } from '../shared/components/alerts/alert.service';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.scss']
})
export class UserComponent implements OnInit {

  @ViewChild('container') container:ElementRef;
  
  constructor(private renderer: Renderer2,
              private el: ElementRef,
              private userService: UserService,
              private router: Router,
              private alert: AlertService) { }

  ngOnInit() {
  }
  model ={
    email :'',
    password:'',
    fullName: '',
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
        this.serverErrorMessages = err.error.message;
      }
    );
  }
  signup() {
    this.renderer.addClass(this.container.nativeElement, 'right-panel-active');
   // this.router.navigateByUrl('/signup');
  }
  signin() {
    this.renderer.removeClass(this.container.nativeElement, 'right-panel-active');
    
  }
  onSignup(form: NgForm) {
    this.userService.postUser(form.value).subscribe(
      res => {
        this.showSucessMessage = true;
        setTimeout(() => this.showSucessMessage = false, 4000);
        this.resetForm(form);
        this.alert.success("Sign Up success, Kindly login using your crediential");
        this.signin();
      },
      err => {
        if (err.status === 422) {
          this.resetForm(form);
          this.alert.error(err.error);
          this.serverErrorMessages = err.error.join('<br/>');
        }
        else  
          this.serverErrorMessages = 'Something went wrong.Please contact admin.';
          this.alert.error(this.serverErrorMessages);
      }
    );
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
