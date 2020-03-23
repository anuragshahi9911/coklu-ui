import { Component, OnInit } from '@angular/core';
import { SnackbarService } from './snackbar.service';


@Component({
  selector: 'app-snackbar',
  templateUrl: './snackbar.component.html',
  styleUrls: ['./snackbar.component.scss']
})
export class SnackbarComponent implements OnInit {
  public messages : String;
  constructor(private snackbarService: SnackbarService,
    ) { }

  ngOnInit() {
    this.snackbarService.getMessage().subscribe((message: String) => {
      if (!message) {
          // clear message when an empty message is received
          this.messages = "";
          return;
      }

      // add message to array
      this.messages = message;    
  });
  }
  
}