import { Injectable } from '@angular/core';
import { GameHistory, Options, Score } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map, tap, timer } from 'rxjs';

const loadUrl = 'http://localhost:8080/scores/snake';
const sendUrl = 'http://localhost:8080/scores';

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
  public namesInScores: Array<string> = [];

  constructor(private _http: HttpClient) {}

  private _loadHeaders = new HttpHeaders({
    accept: 'application/json',
  });

  public scores$ = this._http
    .get<Array<Score>>(loadUrl, {
      headers: this._loadHeaders,
    })
    .pipe(
      tap(() => {
        this.namesInScores = [];
      }),
      map((data) =>
        data
          .sort((a, b) => b.score - a.score)
          .slice(0, 10)
          .map((player, i) => {
            !this.namesInScores.includes(player.name) &&
              this.namesInScores.push(player.name);

            player.position = i + 1;
            return player;
          })
      )
    );

  public time$ = timer(0, 30000);

  public sendScore(name: string, score: number, token: string) {
    const headers = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    });

    const body = {
      name: name,
      game: 'snake',
      score: score,
    };
    const options = { headers };

    return this._http.post<Array<Score>>(sendUrl, body, options);
  }
}
