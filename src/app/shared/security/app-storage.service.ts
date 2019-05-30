import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AppStorageService {

  public getItem(key: string): any {
    const dataFromSession = JSON.parse(sessionStorage.getItem(key));
    if (dataFromSession) {
      return dataFromSession;
    } else {
      const dataFromLocal = JSON.parse(localStorage.getItem(key));
      if (dataFromLocal) {
        sessionStorage.setItem(key, JSON.stringify(dataFromLocal));
      }
      return dataFromLocal;
    }
  }

  public setItem(key: string, jsonObject: any) {
    sessionStorage.setItem(key, JSON.stringify(jsonObject));
    localStorage.setItem(key, JSON.stringify(jsonObject));
  }

  public removeItem(key) {
    localStorage.removeItem(key);
    sessionStorage.removeItem(key);
  }
}
