import { Injectable } from '@angular/core';
import { Login, UserToken } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'http://localhost:8080/check-token';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _dataVerified: boolean = false;

  private _headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient) {}

  public checkToken(token: string) {
    const body = { 'auth-token': token };

    return this._http.post<UserToken>(url, body, {
      headers: this._headers,
    });
  }

  public set login(data: Login) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  public get login() {
    return JSON.parse(localStorage.getItem('user')!);
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
