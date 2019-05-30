import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
export class AppConfigService {
    public timeZone: string;
    public dateFormat: string;
}
