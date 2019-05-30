import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';


@Component({
  // tslint:disable-next-line:component-selector
  selector: 'onehomeng-date-picker',
  templateUrl: './date-picker.component.html',
  styleUrls: ['./date-picker.component.scss']
})
export class DatePickerComponent implements OnInit {

  @Output() datechanged: EventEmitter<any> = new EventEmitter();
  @Input() public dataModel: any;
  @Input() public singleDatePicker: boolean;
  @Input() public styleChange = false;
  @Input() public calendarId: any;
  public placeHolderData: any;


  constructor() { }

  ngOnInit() {


    if (this.singleDatePicker) {
      this.placeHolderData = 'Select date...';
    } else {
      this.placeHolderData = 'Select daterange...';
    }
  }

  public datesUpdated(event: any) {
    this.datechanged.emit(event);
  }

}
