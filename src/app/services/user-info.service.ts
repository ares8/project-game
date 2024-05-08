import { Injectable } from '@angular/core';
import { Login, UserToken } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _dataVerified: boolean = false;
  private _login: Login = {
    name: '',
    token: '',
  };

  constructor(private _http: HttpClient) {}

  public checkToken(token: string) {
    const URL = 'http://localhost:8080/check-token';

    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
    });

    const body = { 'auth-token': token };
    const options = { headers };

    return this._http.post<UserToken>(URL, body, options);
  }

  public set login(data: Login) {
    this._login.name = data.name;
    this._login.token = data.token;
  }

  public get login() {
    return this._login;
  }

  public get isValid() {
    return this._dataVerified;
  }

  public verifyLogin(): void {
    this._dataVerified = true;
  }

  public reset(): void {
    this._dataVerified = false;
  }
}
