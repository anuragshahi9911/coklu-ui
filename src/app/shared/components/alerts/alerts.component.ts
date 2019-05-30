import { Component, OnInit, Input } from '@angular/core';
import { AlertService } from './alert.service';

@Component({
  // tslint:disable-next-line:component-selector
  selector: 'onehomeng-alerts',
  templateUrl: './alerts.component.html',
  styleUrls: ['./alerts.component.css']
})
export class AlertsComponent implements OnInit {

  @Input() privateAlertService: AlertService;
  @Input() inlineAlerts: boolean ;

  public alerts: any[] = [];
  public id = 0;

  constructor(private alertservice: AlertService) {
    /*
      Observable.timer(1000).subscribe(() => {
        this.alertservice.createAlert('danger',
          [`This alert will be closed in 30 seconds (added: ${new Date().toLocaleTimeString()})`], 0);
        this.alertservice.createAlert('danger',
          [`This alert will be closed in 30 seconds (added: ${new Date().toLocaleTimeString()})`]);
        this.id = this.alertservice.createAlert('warning', [`${new Date()}`, `${new Date()}`, `${new Date()}`], null, true);
      });
      Observable.timer(3000).subscribe(() => {
        this.alertservice.createAlert('info',
          [`This DISMISSIBLE alert will be closed in 3 seconds (added: ${new Date().toLocaleTimeString()})`], 3000, true);
        this.alertservice.appendMessage(this.id,['Hello']);
        this.alertservice.appendMessage(this.id,['Hello0000000000000']);
      });
      Observable.timer(7000).subscribe(() => {
        this.alertservice.removeAlert(this.id);
      });
      Observable.timer(2000).subscribe(() => {
        this.alertservice.error('This is an <b>errorMsg</b>');
        this.alertservice.warn('This is a <i>warningMsg</i>');
        this.alertservice.success('This is a successMsg');
      });
    */
  }

  public ngOnInit() {
    if (this.privateAlertService) {
      this.alertservice = this.privateAlertService;
      /* use the privateAlertService if available and
       ignore constructor injected one */
    }
    this.alertservice.getAlertBroadcast()
      .subscribe((alert: any) => {
        if (alert.alertId === -1) {
          return; // return if Subject initialisation
        }
        if (alert.isNew) {
          if (alert.alertId >= this.alerts.length) {
            // true => new alert && msg!== null // && alert.msg !== null
            this.alerts.push(alert);
          } else { // then its within buffer
            this.alerts[alert.alertId] = alert;
          }
        } else if (alert.msgs && alert.msgs.length === 0) { // from removeAlert
          // if existing alert and received blank msg, delete it.
          if (this.alerts[alert.alertId]) {
            this.alerts[alert.alertId].msgs = []; // alerts with blank msgs[] will not be rendered
          }
        } else { // from Append Alert
          // existing alert and received a new msg[], append new msgs
          if (this.alerts[alert.alertId]) {
            this.alerts[alert.alertId].msgs.push(alert.msgs);
          } // else { *INVALID SCENARIO // this.alerts[alert.alertId].msgs=alert.msgs }
        }
      });
  }

}
