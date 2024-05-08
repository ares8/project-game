import { Injectable } from '@angular/core';
import { GameHistory, Options, Score } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(private _http: HttpClient) {}

  public load() {
    const URL = 'http://localhost:8080/scores/snake';

    const headers = new HttpHeaders({
      accept: 'application/json',
    });

    return this._http.get<Array<Score>>(URL, { headers });
  }
}
