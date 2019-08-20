import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class GraphService {
 
  constructor(private httpClient: HttpClient) { 
  }
  public getCurrencyPairs(): Observable<any> {
    return this.httpClient.get('https://restsimulator.intuhire.com/currency_pairs');
}
}
