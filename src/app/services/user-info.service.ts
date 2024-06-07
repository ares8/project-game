import { Injectable } from '@angular/core';
import { Login, UserToken } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const url = 'https://scores.chrum.it/check-token';

@Injectable({
  providedIn: 'root',
})
export class UserInfoService {
  private _correctToken: string = '';

  private _headers = new HttpHeaders({
    accept: 'application/json',
    'Content-Type': 'application/json',
  });

  constructor(private _http: HttpClient) { }

  public checkToken(token: string) {
    const body = { 'auth-token': token };

    return this._http.post<UserToken>(url, body, { headers: this._headers });
  }

  public set login(data: Login) {
    localStorage.setItem('user', JSON.stringify(data));
  }

  public get login() {
    return JSON.parse(localStorage.getItem('user')!);
  }

  public set token(token: string) {
    this._correctToken = token;
  }

  public get token() {
    return this._correctToken;
  }

  public reset() {
    localStorage.removeItem('user');
    this._correctToken = '';
  }
}
