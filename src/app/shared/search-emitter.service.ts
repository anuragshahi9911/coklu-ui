import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class SearchEmitterService {

  private searchEventSubject = new Subject<String>();
  public searchText = '';
  constructor() { }

  public publishEvent(event: any) {
    this.searchEventSubject.next(event);
  }

  /**
   * Method to receive the search events
   */
  public receiveEvent(): Observable<any> {
    return this.searchEventSubject.asObservable();
  }

}
