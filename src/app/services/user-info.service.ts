import { Injectable } from '@angular/core';
import { Login } from '../models';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _dataVerified: boolean = false;
  private _login: Login = {
    name: '',
    email: '',
  };

  public set login(data: Login) {
    this._login.name = data.name;
    this._login.email = data.email;
  }

  public get login() {
    return this._login;
  }

  public get isValid() {
    return this._dataVerified;
  }

  public verifyData(): void {
    this._dataVerified = true;
  }

  public reset(): void {
    this._dataVerified = false;
  }
}
