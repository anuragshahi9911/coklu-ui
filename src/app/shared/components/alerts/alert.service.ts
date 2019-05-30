import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';


class Alert {
  alertId: number;
  type: string;
  msgs: string[];
  timeout: number;
  dismissible: boolean;
  isNew: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class AlertService {

  private alertsSubject: BehaviorSubject<Alert>;
  private alertIdCtr = 0;
  public alertBufferSize = 10;

  constructor() {
    const alert = new Alert();
    alert.alertId = -1; // initialise BehaviorSubject using an alert with negative alertId that will be ignored
    this.alertsSubject = new BehaviorSubject<Alert>(alert);
  }

  // Returns the observable for subscribing to any
  public getAlertBroadcast(): Observable<Alert> {
    return this.alertsSubject.asObservable();
  }

  public createAlert(type: string, messages: string[] = [], timeout = 30000, dismissible: boolean = false): number {
    const alert = new Alert();
    if (this.alertIdCtr >= this.alertBufferSize) {
      this.alertIdCtr = 0;
      /* Reset if more than 10 alerts created.
      So that component reuses existing alerts in alert array */
    }
    alert.isNew = true;
    alert.alertId = this.alertIdCtr;
    alert.msgs = messages;
    alert.type = type;
    alert.timeout = timeout < 1000 ? 1000 : timeout; // if less than 1sec default to 1sec
    alert.dismissible = dismissible;
    this.alertsSubject.next(alert);
    return this.alertIdCtr++;
  }

  public removeAlert(alertId: any) {
    const alert = new Alert();
    alert.alertId = alertId;
    alert.msgs = [];
    this.alertsSubject.next(alert);
  }

  public appendMessage(alertId: number, msgs: string[]) {
    const alert = new Alert();
    alert.alertId = alertId;
    alert.msgs = msgs;
    this.alertsSubject.next(alert);
  }

  public clearAll() {
    for (let i = 0; i < this.alertBufferSize; i++) {
      const alert = new Alert();
      alert.alertId = i;
      alert.msgs = []; // To clear set msgs to blank array;
      this.alertsSubject.next(alert);
    }
    return this;
  }

  public error(message: string | string[]): number {
    const msgs: string[] = (typeof message === 'string') ? [message] : message;
    return this.createAlert('danger', msgs, 10000, true);
  }

  public success(message: string | string[]): number {
    const msgs: string[] = (typeof message === 'string') ? [message] : message;
    return this.createAlert('success', msgs, 5000, true);
  }

  public warn(message: string | string[]): number {
    const msgs: string[] = (typeof message === 'string') ? [message] : message;
    return this.createAlert('warning', msgs, 5000, true);
  }

}
