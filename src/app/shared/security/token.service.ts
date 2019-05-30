import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { AppStorageService } from './app-storage.service';
import { Subscription } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class TokenService {

  private refreshTokenUrl = 'token/refresh';
  private TOKEN_NAME = 'locate_token';
  public tokenExpirationTime: any;
  private MANUAL_REFRESH_BUFFER: number = 3 * 60; // Buffer time in millis for manual refresh
  public subscription: Subscription;

  constructor(private http: HttpClient, private appStorageService: AppStorageService) { }

  public getToken(tokenName: string): string {
    const currentUser = this.appStorageService.getItem(tokenName);
    const token = currentUser && currentUser.token;
    return token ? token : '';
  }

  public setToken(tokenname: string, token: any, tokenExpiry: any) {

    this.appStorageService.setItem(tokenname, {
      tokenname: tokenname,
      token: token,
      tokenExpiry: tokenExpiry
    }
    );
  }

  public refreshToken() {
    if (this.subscription) {
      this.subscription.unsubscribe();
      this.subscription.remove(this.subscription);
    }
    this.subscription = this.http.get(this.refreshTokenUrl).subscribe((response: any) => {
      if (response) {
        this.tokenExpirationTime = response.expiryTime;
        this.setToken('locate_token', response.token, response.expiryTime);
      }
    });
    return;
  }

  public invalidateToken(): void {
    this.appStorageService.removeItem(this.TOKEN_NAME);
  }

  public isAuthenticatedUser(): boolean {
    return !this.isTokenExpired();
  }

  public isTokenExpired(token?: any): boolean {
    if (!token) {
      token = this.getToken('locate_token');
    }
    if (!token) {
      return true;
    }
    return false;
    // const date = this.getTokenExpirationDate();
    // if (date === undefined) {
    //   return false;
    // }
    // return !(date > new Date().valueOf());
  }
  // Method used to verify whether the current token is nearing to expiry (checking against a manual buffer).
  // If the current token is nearing to expiry and within the buffer we need to refresh the token again.
  public isTokenExpiryBufferCrossed(): boolean {
    const token = this.getToken('locate_token');
    let millisecondsToExpiry: any;
     if (!token) {
       return false;
     }
    const currentTimeInMs = new Date().valueOf() / 1000;
    if (this.tokenExpirationTime) {
      millisecondsToExpiry = this.tokenExpirationTime.valueOf() - currentTimeInMs;
    }
    if (millisecondsToExpiry && millisecondsToExpiry <= this.MANUAL_REFRESH_BUFFER) {
      return true;
    }
    return false;
  }
}
