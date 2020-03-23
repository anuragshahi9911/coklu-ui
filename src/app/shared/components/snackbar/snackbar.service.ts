import { Injectable } from '@angular/core';
import { Subject, Observable, BehaviorSubject } from 'rxjs';



@Injectable({
  providedIn: 'root'
})
export class SnackbarService {
  private subject = new BehaviorSubject<any>("default message");
  constructor() { }

  public saveMessage(msg: String) {
    this.subject.next(msg);
  }
  public getMessage(): Observable<any> {
    return this.subject.asObservable();
}
}
