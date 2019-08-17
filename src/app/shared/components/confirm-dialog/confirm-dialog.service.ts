import { Injectable } from '@angular/core';
import { Subject, Observable } from 'rxjs';

export class ConfirmDialog {
  dialogId: number;
  type: string;
  messages: string[];
}

@Injectable({
  providedIn: 'root'
})
export class ConfirmDialogService {

  private dialogResponseSubject: Subject<any>;
  private dialogBroadcastSubject: Subject<any>;

  constructor() {
    const dialog = new ConfirmDialog();
    // Initialise BehaviorSubject using an alert with negative alertId that will be ignored
    // dialog.dialogId = -1;
    this.dialogResponseSubject = new Subject<{}>();
    this.dialogBroadcastSubject = new Subject<{}>();
  }

  /* Returns the observable for subscribing to any new dialogs
     so that component can show the dialog box */
  public getDialogBroadcast(): Observable<any> {
    return this.dialogBroadcastSubject.asObservable();
  }

  /* Emits the response back through dialogResponseSubject
     To be called on clicking yes/no/close */
  public sendResponse(userResponse: boolean | string) {
    this.dialogResponseSubject.next(userResponse);
  }

  // Shows a new dialog by emitting event to Component
  public showDialog(message: string[], type: string): Observable<boolean> {
    const confirmDialog = new ConfirmDialog();
    confirmDialog.messages = message;
    confirmDialog.type = type;
    this.dialogBroadcastSubject.next(confirmDialog);
    // Clear all previous subscriptions
    this.dialogResponseSubject.unsubscribe();
    // Create and assign a new subject
    this.dialogResponseSubject = new Subject<{}>();
    return this.dialogResponseSubject.asObservable();
  }

  public confirmDialog(message: string | string[]): Observable<boolean> {
    return this.showDialog([].concat(message), 'confirm');
  }

  public okcancelDialog(message: string | string[]): Observable<boolean> {
    return this.showDialog([].concat(message), 'okcancel');
  }

  public okDialog(message: string | string[]): Observable<boolean> {
    return this.showDialog([].concat(message), 'ok');
  }

  public yesnocancelDialog(message: string | string[]): Observable<boolean> {
    return this.showDialog([].concat(message), 'yesnocancel');
  }

  public yesallnoallcancelDialog(message: string | string[]): Observable<boolean> {
    return this.showDialog([].concat(message), 'yesallnoallcancel');
  }

}
