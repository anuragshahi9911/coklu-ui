﻿import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class UserService {
  
      phoneLogin: Boolean;
      noAuthHeader = { headers: new HttpHeaders({ 'NoAuth': 'True' }) };
    
      constructor(private http: HttpClient) { }
    
      //HttpMethods
    
      postUser(user: User){
        return this.http.post(environment.apiUrl +'/register',user,this.noAuthHeader);
      }
    
      login(authCredentials) {
        return this.http.post(environment.apiUrl + '/authenticate', authCredentials,this.noAuthHeader);
      }
    
      getUserProfile() {
        return this.http.get(environment.apiUrl + '/userProfile');
      }
    
    
      //Helper Methods
    
      setToken(token: string) {
        localStorage.setItem('token', token);
      }
    
      getToken() {
        return localStorage.getItem('token');
      }
    
      deleteToken() {
        localStorage.removeItem('token');
        localStorage.removeItem('currentUser');
      }
    
      getUserPayload() {
        var token = this.getToken();
        if (token) {
          var userPayload = atob(token.split('.')[1]);
          return JSON.parse(userPayload);
        }
        else
          return null;
      }
    
      isLoggedIn() {
        if (!this.phoneLogin || this.getToken()) {
          var userPayload = this.getUserPayload();
          if (userPayload)
            return userPayload.exp > Date.now() / 1000;
          else
            return false;
        } else {
          return false
        }
       
      }
}