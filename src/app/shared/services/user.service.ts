import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User } from '../models/user.model';


@Injectable({ providedIn: 'root' })
export class UserService {
    constructor(private http: HttpClient) {
      }
      login(authCredentials) {
        return this.http.post(environment.apiUrl + '/authenticate', authCredentials);
      }
     
     setToken(token: string) {
        localStorage.setItem('token', token);
      }
     
      getToken() {
        return localStorage.getItem('token');
      }
     
      deleteToken() {
        localStorage.removeItem('token');
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
        var userPayload = this.getUserPayload();
        if (userPayload)
          return userPayload.exp > Date.now() / 1000;
        else
          return false;
      }
      getUserProfile() {
        return this.http.get(environment.apiUrl + '/userProfile');
      }
}