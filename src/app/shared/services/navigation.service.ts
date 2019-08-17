import { Injectable } from '@angular/core';
import { Router, NavigationEnd, ActivatedRouteSnapshot, Params, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Title } from '@angular/platform-browser';
import { ConfirmDialogService } from '../components/confirm-dialog/confirm-dialog.service';
import { AlertService } from '../components/alerts/alert.service';
import { map, filter } from 'rxjs/operators';
import { BreadCrumbItem } from '../models/breadcrumb-item';
import { UserService } from '../security/user.service';
import { BehaviorSubject, Observable } from 'rxjs';
// Service for displaying Breadcrumbs, Main Menu, Menu ID based Traversal
@Injectable({
  providedIn: 'root'
})
export class NavigationService {

  private currentMenuIdSubject: BehaviorSubject<string>;
  private menuIdbreadcrumbsMapping = [];
  public currentBreadCrumb: BreadCrumbItem[];
  private rootBreadCrumb: BreadCrumbItem;
  public isAppInitialized = false;
  public preventNavigation = false;
  private retainAlertsOnNavigation = false;
  private homeLabel = 'Dashboard';
  // private currentMenuId: string;

  constructor(private router: Router, private http: HttpClient,
    private userService: UserService, private confirmDialogService: ConfirmDialogService,
    private activatedRoute: ActivatedRoute,
    private titleService: Title,
    private alertService: AlertService) {

    this.rootBreadCrumb = { id: '', displayValue: this.homeLabel, route: 'home/dashboard' };
    this.currentMenuIdSubject = new BehaviorSubject<string>('home');

    this.getInnerRouteSnapshotAfterNavigation()
      .subscribe(snapshot => {
        this.titleService.setTitle(snapshot.data.title ? snapshot.data.title : '');
      }
      );
  }

  public initAppDataAndReload(url: string) {
    this.isAppInitialized = false;
    this.userService.loadUserDetails().subscribe(userInfo => {
      this.isAppInitialized = true;
        if (url === '' || url === '/home' || url === '/home/dashboard') {
          if (this.userService.canAccessRoute('dashboard')) {
            this.navigateByUrl('/home/dashboard');
          } else if (this.userService.canAccessRoute('stores')) {
            this.navigateByUrl('/home/stores');
          } else if (this.userService.canAccessRoute('orders')) {
            this.navigateByUrl('/home/orders');
          }
        } else {
          this.navigateByUrl(url);
        }
    });
  }

  public getRouteAsAString(route: ActivatedRouteSnapshot) {
    if (route.url) {
      let url = '';
      route.url.forEach(routeUrl => {
        url += '/' + routeUrl.path;
      });
      return url;
    } else {
      return '';
    }
  }
  /* Please ensure url navigations are done using method ::
     NavigationService.navigateByMenuId(id) instead of router.navigateByUrl(url);
    >> Calls router.navigateByUrl(url) for the given menuId.
    >> Updates the new breadcrumb.
    >> Emits new Menu ID Change Event
    >> Returns boolean for navigation Success/Failure */
  public navigateByMenuId(newMenuId: string, skipLocationChange?: boolean) {
    const url = ''; // || '/home'
    if (url) {
      if (this.preventNavigation) {
        const dialogMsg = [`<b>` + 'You have unsaved data, Do you want to continue?' + `</b>`];
        this.confirmDialogService.confirmDialog(dialogMsg)
          .subscribe((isConfirmed) => {
            if (!isConfirmed) {
              return false;
            }
            this.preventNavigation = false;
            this.router.navigateByUrl(url, { skipLocationChange: skipLocationChange });
            // Update Breadcrumbs if Navigation SUCCESS
            const breadCrumbMapping = this.menuIdbreadcrumbsMapping[newMenuId];
            this.currentBreadCrumb = breadCrumbMapping ? [].concat(breadCrumbMapping) : this.currentBreadCrumb;
            this.currentMenuIdSubject.next(newMenuId);
            return true; // Navigation Success
          });
        return;
      } else {
        this.router.navigateByUrl(url, { skipLocationChange: skipLocationChange });
        // Update breadcrumbs if navigation success
        const breadCrumbMapping = this.menuIdbreadcrumbsMapping[newMenuId];
        this.currentBreadCrumb = breadCrumbMapping ? [].concat(breadCrumbMapping) : this.currentBreadCrumb;
        this.currentMenuIdSubject.next(newMenuId);
        return true; // Navigation Success
      }
    } else {
      return false; // Navigation Failure
    }
  }

  public navigateByUrl(url: string, skipLocationChange?: boolean) {
    if (url) {
      if (this.preventNavigation) {
        const dialogMsg = [`<b>` + 'You have unsaved data, Do you want to continue?' + `</b>`];
        this.confirmDialogService.confirmDialog(dialogMsg).subscribe((isConfirmed) => {
          if (!isConfirmed) {
            return false;
          }
          this.preventNavigation = false;
          this.router.navigateByUrl(url, { skipLocationChange: skipLocationChange });
        });
        return;
      }
      this.router.navigateByUrl(url, { skipLocationChange: skipLocationChange });
      // this.currentMenuIdSubject.next(newMenuId);
      return true; // Navigation Success
    } else {
      return false; // Navigation Failure
    }
  }

  // Use the below method for navigating with optional queryParams
  public navigate(path: string, params?: {}) {
    if (path) {
      if (this.preventNavigation) {
        const dialogMsg = [`<b>` + 'You have unsaved data, Do you want to continue?' + `</b>`];
        this.confirmDialogService.confirmDialog(dialogMsg).subscribe((isConfirmed) => {
          if (!isConfirmed) {
            return false;
          }
          this.preventNavigation = false;
          this.router.navigate([path], { queryParams: params });
        });
        return;
      }
      this.router.navigate([path], { queryParams: params });
      // this.currentMenuIdSubject.next(newMenuId);
      return true; // Navigation Success
    } else {
      return false; // Navigation Failure
    }
  }

  // Use the below method for navigating with optional route params
  public navigateWithRouteParams(path: string, params: string[]) {
    if (path) {
      if (this.preventNavigation) {
        const dialogMsg = [`<b>` + 'You have unsaved data, Do you want to continue?' + `</b>`];
        this.confirmDialogService.confirmDialog(dialogMsg).subscribe((isConfirmed) => {
          if (!isConfirmed) {
            return false;
          }
          this.preventNavigation = false;
          this.router.navigate([path].concat(params));
          // this.router.navigate([path], { queryParams: params });
        });
        return;
      }
      // this.router.navigate([path], { queryParams: params });
      this.router.navigate([path].concat(params));
      this.currentMenuIdSubject.next('dummyTrigger');
      // this.currentMenuIdSubject.next(newMenuId);
      return true; // Navigation Success
    } else {
      return false; // Navigation Failure
    }
  }

  // Returns Current Breadcrumb corresponding to the Last Clicked/Navigated Menu.
  public getCurrentBreadCrumb(): BreadCrumbItem[] {
    if (!this.currentBreadCrumb) {
      return [this.rootBreadCrumb]; // Return rootCrumb if unitialised
    }
    return this.currentBreadCrumb;
  }

  /* Returns the rootmenuId corresponding to the last clicked/navigated menu.
     Used for highlighting the root menu in selected state when navigated through
     navigateByMenuId(id) method or on clicking on breadcrumbs. */
  public getCurrentRootMenuId(): string {
    // If home send 'home' else send second crumbs id
    if (!this.currentBreadCrumb) {
      return this.rootBreadCrumb.id; // Return 'home' if null
    }
    return this.currentBreadCrumb[1] ? this.currentBreadCrumb[1].id : this.rootBreadCrumb.id;
  }

  /* Method to reset breadcrumb to Corresponding breadcrumb for a given menuId */
  public resetBreadcrumb(resetToMenuId: string): NavigationService {
    this.currentBreadCrumb = [].concat(this.menuIdbreadcrumbsMapping[resetToMenuId]);
    // Trigger Subject using some dummyId so that breadcrumb component recives the update;
    this.currentMenuIdSubject.next('dummyTrigger');

    return this;
  }
  /* Method to add a non navigable breadcrumb item */
  public addNonNavigableBreadCrumb(displayName: string) {
    this.addBreadCrumbItem(displayName);
    return this;
  }
  /* Method to add a breadcrumbitem with optional route */
  public addBreadCrumbItem(displayName: string, routeIdOrUrl?: string): NavigationService {
    if (!this.currentBreadCrumb) {
      this.currentBreadCrumb = [this.rootBreadCrumb];
    }
    // if mapping is available use the mapped route
    const routeUrlFromRouteId = routeIdOrUrl ? routeIdOrUrl : null;
    // if no mappings available use as routeUrl directly
    const routeUrl = routeUrlFromRouteId ? routeUrlFromRouteId : routeIdOrUrl;
    this.currentBreadCrumb.push({ id: '', displayValue: displayName, route: routeUrl });
    // Trigger Subject using some dummyId so that breadcrumb component recives the update;
    this.currentMenuIdSubject.next('dummyTrigger');

    return this;
  }
  /* Method to remove last breadcrumb item */
  public removeLastBreadCrumbItem(): NavigationService {
    this.currentBreadCrumb.pop();
    return this;
  }
  /*END: Methods for breadcrumb manipulation */

  /* Methods to retrieve the ActivatedRouteSnapshot on NavigationEnd events*/
  public getInnerRouteSnapshotAfterNavigation(): Observable<ActivatedRouteSnapshot> {
    return this.router.events.pipe(filter(event => event instanceof NavigationEnd)
      , map(event => {
        // console.log(event,   this.router.routerState.snapshot);
        const snapshot = this.getInnermostRouteSnapshot(this.router.routerState.snapshot.root);
        return snapshot;
      }));
  }
  /* Recursive function to find innermost child of ActivatedRouteSnapshot*/
  private getInnermostRouteSnapshot(snapshot: ActivatedRouteSnapshot): ActivatedRouteSnapshot {
    if (snapshot.children.length > 0) {
      return this.getInnermostRouteSnapshot(snapshot.children[0]);
    } else {
      return snapshot;
    }
  }
  /* Wrapper method to set/get title using titleservice */
  public setPageTitle(title: string) {
    this.titleService.setTitle(title);
  }
  public getPageTitle(): string {
    return this.titleService.getTitle();
  }

  public getRouteParams(): Params {
    if (this.activatedRoute && this.activatedRoute.snapshot) {
      return this.activatedRoute.snapshot.queryParams;
    } else {
      return {};
    }
  }

  /* Method to set retainAlerts without clearing after a navigation call ends
	This method does a one time setting of flag. Call again to change flag state again*/
  public retainAlerts(): NavigationService {
    this.retainAlertsOnNavigation = true;
    return this;
  }


    /* Returns the observable for subscribing to any menu changes.
     Used in breadcrumb/menu component. */
     public getNavigatedMenuIdBroadcast(): Observable<string> {
      return this.currentMenuIdSubject.asObservable();
    }

    public populateBreadcrumb() {
    }
    public checkBreadcrumb() {
      if (this.currentBreadCrumb) {
        if (this.currentBreadCrumb.length > 2) {
          this.removeLastBreadCrumbItem();
        }
      }
      if (this.currentBreadCrumb) {
        this.currentBreadCrumb.forEach(data => {
          if (data.displayValue !== 'Dashboard') {
            this.removeLastBreadCrumbItem();
          }
        });
      }
    }

}
