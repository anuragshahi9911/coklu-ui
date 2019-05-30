import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoggerService {
  constructor() {
  }
  private consoleLoggerEnabled = 'console';

  private doNothingFn = (arg: any) => { };

  public get assert() {
    if (this.consoleLoggerEnabled) {
      return console.assert.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get error() {
    if (this.consoleLoggerEnabled) {
      return console.error.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get group() {
    if (this.consoleLoggerEnabled) {
      return console.group.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get groupEnd() {
    if (this.consoleLoggerEnabled) {
      return console.groupEnd.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get info() {
    if (this.consoleLoggerEnabled) {
      // tslint:disable-next-line:no-console
      return console.info.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get log() {
    if (this.consoleLoggerEnabled) {
      return console.log.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get warn() {
    if (this.consoleLoggerEnabled) {
      return console.warn.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

  public get debug() {
    if (this.consoleLoggerEnabled) {
      // tslint:disable-next-line:no-console
      return console.debug.bind(console);
    } else {
      return this.doNothingFn;
    }
  }

}
