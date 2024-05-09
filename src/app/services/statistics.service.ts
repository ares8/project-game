import { Injectable } from '@angular/core';
import { GameHistory, Options, Score } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UserInfoService } from './user-info.service';

@Injectable({
  providedIn: 'root',
})
export class StatisticsService {
  public scores: Array<Score> = [];
  public history: Array<GameHistory> = [];
  public options: Options = {
    names: [],
    games: {},
    actions: {},
    currentName: '',
  };

  constructor(private _http: HttpClient, private _userInfo: UserInfoService) {}

  public load() {
    const URL = 'http://localhost:8080/scores/snake';

    const headers = new HttpHeaders({
      accept: 'application/json',
    });

    return this._http.get<Array<Score>>(URL, { headers });
  }

  public sendScore(name: string, score: number) {
    const URL = 'http://localhost:8080/scores';

    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': this._userInfo.login.token,
    });

    const body = {
      name: name,
      game: 'snake',
      score: score,
    };

    const options = { headers };

    return this._http.post<Array<Score>>(URL, body, options);
  }
}
