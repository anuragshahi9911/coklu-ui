import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { TokenService } from './token.service';
import { UserInfo } from '../models/user-info.model';
import { CookieService } from './cookie.service';
import { EventEmitter } from 'events';
import { Subject, ReplaySubject, Observable } from 'rxjs';
import { User } from '../models/user.model';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  public userInfo: UserInfo;
  public firstLogin: boolean;
  public isUserAuthenticated: boolean;
  public isUserInfoLoaded: boolean;
  public userEventEmitter: EventEmitter = new EventEmitter();
  private userEventSubject = new Subject<any>();

  // The subject which will send out listeners to the metadata fetch
  private userDetailFetchSubject: ReplaySubject<any>;

  constructor(private tokenService: TokenService,
    private cookieService: CookieService,
    private http: HttpClient) {
    this.userInfo = new UserInfo();
    this.userInfo.routes = [];
    const authCookie = this.cookieService.getCookie('locateAuth');
    const locateToken = this.cookieService.getCookie('locate_token');
    if (authCookie && locateToken) {
      this.isUserAuthenticated = true;
      const authObj = JSON.parse(unescape(authCookie));
      const tokenExpiry = authObj['tokenExpiry'];
      this.tokenService.setToken('locate_token', locateToken, tokenExpiry);
      this.tokenService.tokenExpirationTime = tokenExpiry;
      Object.keys(authObj['access']).forEach((route: any) => {
        if (route.indexOf('locate') !== -1) {
          const accessibleRoute = route.split('locate.')[1];
          this.userInfo.routes.push(accessibleRoute);
        }
      });
      // this is a temporary cookie and we dont need this anymore
      this.cookieService.deleteCookie('locateAuth');
    } else {
     // temp fix
      this.isUserAuthenticated = true;
      this.logout();
    }
  }
  getAll() {
    return this.http.get<User[]>(`${environment.apiUrl}/users`);
}

getById(id: number) {
    return this.http.get(`${environment.apiUrl}/users/${id}`);
}

register(user: User) {
    return this.http.post(`${environment.apiUrl}/users/register`, user);
}

update(user: User) {
    return this.http.put(`${environment.apiUrl}/users/${user.id}`, user);
}

delete(id: number) {
    return this.http.delete(`${environment.apiUrl}/users/${id}`);
}
  public loadUserDetails(): Observable<any> {
    if (!this.userDetailFetchSubject) {
      this.userDetailFetchSubject = new ReplaySubject<any>(1);

      this.isUserInfoLoaded = false;
      this.http.get('user').subscribe((response: any) => {
        this.transformUserResponse(response);
        this.isUserInfoLoaded = true;
        this.userDetailFetchSubject.next(this.userInfo);
        this.userDetailFetchSubject.complete();
        this.publishEvent({});
      });
    }
    return this.userDetailFetchSubject.asObservable();
  }

  private transformUserResponse(userResponse: any) {
    if (userResponse) {
      this.userInfo.userId = userResponse.userId;
      this.userInfo.superuser = userResponse.superuser;
      this.userInfo.title = userResponse.title;
      this.userInfo.forename = userResponse.forename;
      this.userInfo.surname = userResponse.surname;
      this.userInfo.email = userResponse.email;
      this.userInfo.typeOfUser = userResponse.typeOfUser;
      this.userInfo.logo = userResponse.logo;
      this.userInfo.contactNumber = userResponse.contactNumber;
      this.userInfo.supplierId = userResponse.supplierId;
      this.userInfo.active = userResponse.active;
      this.userInfo.status = userResponse.status;
      this.userInfo.retailers = userResponse.retailers;
      this.userInfo.brands = userResponse.brands;
      this.userInfo.storeId = userResponse.storeId;
      this.userInfo.permissions = userResponse.permissions;
      this.userInfo.applications = userResponse.application;
      this.userInfo.userType = this.getUserType(userResponse);
    }
  }
  // method used to identify the user type of the logged-in user
  public getUserType(userInfo: any): string {
    let userType = '';
    if (userInfo && userInfo.brands && userInfo.retailers) {
      if (userInfo.brands.length > 1 && userInfo.retailers.length === 1) {
        userType = 'Retailer';
      } else if (userInfo.retailers.length > 1 && userInfo.brands.length === 1) {
        userType = 'Brand';
      } else if (userInfo.retailers.length === 1 && userInfo.brands.length === 1) {
        if (userInfo.typeOfUser) {
          if (userInfo.typeOfUser === 'Administrator') {
            userType = 'General User';
          } else if (userInfo.typeOfUser === 'Account') {
            userType = 'Retailer';
          } else {
            userType = userInfo.typeOfUser;
          }
        }
      } else {
        userType = 'General User';
      }
      return userType;
    }
  }
  // Invalidates the token using token service and clears all local information.
  public logout() {
    this.tokenService.invalidateToken();
    this.userInfo = null;
    // this.appStorageService.removeItem(KEYS_APPSTORAGE.USER_INFO);
    // this.navService.isAppInitialized = false;
    // window.location.href = account_url + '/' + logout; // SIT URL changed
  }

  // Invalidates the token using token service and clears all local information.
  public isAuthenticatedUser() {
    return this.isUserAuthenticated; // && this.tokenService.isAuthenticatedUser();
  }

  public canAccessRoute(route: string) {
    if (!this.isAuthenticatedUser()) {
      return false;
    }

    if (route === '/home') {
      return true;
    } else {
      if (route.startsWith('/')) {
        route = route.slice(1);
      }
      if (route.startsWith('home')) {
        route = route.slice(5);
      }
      const accessibleRoutes = this.userInfo.routes.filter((userRoute: any) => {
        return route.startsWith(userRoute);
      });
      return accessibleRoutes.length > 0;
    }
  }

  public publishEvent($event: any) {
    this.userEventSubject.next($event);
  }

  public receiveEvent(): Observable<any> {
    return this.userEventSubject.asObservable();
  }
}
