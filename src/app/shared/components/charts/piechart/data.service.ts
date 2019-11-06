import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IData } from './data.interface';
import { of } from 'rxjs';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor() { }

  public dummyData: Array<IData> = [
  { 'PlayerName': 'Kumble', 'Run': 10 },
  { 'PlayerName': 'Kohli', 'Run': 100 },
  { 'PlayerName': 'Raina', 'Run': 12},
  { 'PlayerName': 'Dhoni', 'Run': 8 },
  { 'PlayerName': 'Sachine', 'Run': 85 },
  { 'PlayerName': 'Sahvaag', 'Run': 91 }];

  public getData(): Observable<Array<IData>> {
    return of(this.dummyData).pipe(map((response: any) => response));
  }
}
