import { Component } from '@angular/core';
import { ConfirmDialogService } from './confirm-dialog.service';
@Component({
  // tslint:disable-next-line:component-selector
  selector: 'onehomeng-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent {

  public hidden = true;
  private buttonA = 'OK';
  private buttonB = '';
  private buttonC = '';
  private buttonD = '';
  private buttonE = '';
  private messageLines: string[] = ['Do you wish to confirm ?'];

  // @ViewChild('buttonA') mainButton:ElementRef;

  constructor(private confirmDialogService: ConfirmDialogService) {
    this.confirmDialogService.getDialogBroadcast()
      .subscribe((dialog: any) => {
        this.messageLines = dialog.messages;
        switch (dialog.type) {
          case 'confirm':
            this.buttonA = 'Yes';
            this.buttonB = '';
            this.buttonC = 'No';
            this.buttonD = '';
            this.buttonE = '';
            break;
          case 'okcancel':
            this.buttonA = 'Ok';
            this.buttonB = '';
            this.buttonC = '';
            this.buttonD = '';
            this.buttonE = 'Cancel';
            break;
          case 'yesnocancel':
            this.buttonA = 'Yes';
            this.buttonB = '';
            this.buttonC = 'No';
            this.buttonD = '';
            this.buttonE = 'Cancel';
            break;
          case 'ok':
            this.buttonA = 'Ok';
            this.buttonB = '';
            this.buttonC = '';
            this.buttonD = '';
            this.buttonE = '';
            break;
          case 'yesallnoallcancel':
            this.buttonA = 'Yes';
            this.buttonB = 'Yes To All';
            this.buttonC = 'No';
            this.buttonD = 'No To All';
            this.buttonE = 'Cancel';
            break;
        }
        this.show();
      });
  }

  private show() {
    this.hidden = false;
  }

  private hide() {
    this.hidden = true;
  }

  private confirm() {
    this.hide(); // !important hide should be done first
    this.confirmDialogService.sendResponse(true);
  }

  private decline() {
    this.hide(); // !important hide should be done first
    this.confirmDialogService.sendResponse(false);
  }

  private cancel() {
    this.hide(); // !important hide should be done first
    this.confirmDialogService.sendResponse('cancel');
  }

  private yestoall() {
    this.hide(); // !important hide should be done first
    this.confirmDialogService.sendResponse('yestoall');
  }


  private notoall() {
    this.hide(); // !important hide should be done first
    this.confirmDialogService.sendResponse('notoall');
  }


}
