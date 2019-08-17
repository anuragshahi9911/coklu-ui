import { Injectable } from '@angular/core';
import { TokenService } from './token.service';
import { UserService } from './user.service';
import { ConfirmDialogService } from '../components/confirm-dialog/confirm-dialog.service';
import { LoggerService } from '../services/logger.service';
import { Subscription } from 'rxjs';

@Injectable({
    providedIn: 'root'
  })
export class SessionTimerService {

    private AUTO_REFRESH_BUFFER: number = 5 * 60 * 1000; // Buffer time in millis for auto refresh on mousemove
    private MANUAL_REFRESH_BUFFER: number = 5 * 60 * 1000; // Buffer time in millis for manual refresh once auto_timer expiress

    private tokenService: TokenService;
    private userService: UserService;

    public isAutoRefreshIntervalActive: boolean;
    private autoRefreshTimer: Subscription;
    private manualRefreshTimer: Subscription;
    private tokenExpiryTimer: Subscription;

    constructor(private confirmDialog: ConfirmDialogService,
        private _logger: LoggerService) { }

    public initialize(userService: UserService, tokenService: TokenService) {
        this.userService = userService;
        this.tokenService = tokenService;
    }
}
