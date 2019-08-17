import { UserInfo } from './user-info.model';

export class LoginResponse {
  public statusCode: number;
  public statusMessage: string;
  public token: string;
  public tokenExpiry: number;
  public userInfo: UserInfo;
  public changePassword: boolean;
}
