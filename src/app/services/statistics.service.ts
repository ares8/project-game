import { Injectable } from '@angular/core';
import { GameHistory, Options, Score } from '../models';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { filter, map, tap, timer } from 'rxjs';

const loadUrl = 'https://scores.chrum.it/scores/snake';
const sendUrl = 'https://scores.chrum.it/scores';

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

  private _loadHeaders = new HttpHeaders({
    accept: 'application/json',
  });

  private _sendHeaders!: HttpHeaders;

  constructor(private _http: HttpClient) { }

  public scores$ = this._http.get<Array<Score>>(loadUrl, { headers: this._loadHeaders })
    .pipe(
      tap(() => {
        this.namesInScores.length = 0;
      }),
      filter((data) => {
        if (Array.isArray(data) && data.length > 0) {
          return true;
        } else {
          this.scores.length && (this.scores.length = 0);
          return false;
        }
      }),
      map((data) => data
        .sort((a, b) => b.score - a.score)
        .slice(0, 10)
        .map((player, i) => {
          !this.namesInScores.includes(player.name) && this.namesInScores.push(player.name);
          player.position = i + 1;
          return player;
        })
      )
    );

  public timer$ = timer(0, 30000);

  public createSendHeaders(token: string) {
    this._sendHeaders = new HttpHeaders({
      accept: 'application/json',
      'Content-Type': 'application/json',
      'auth-token': token,
    });
  }

  public sendScore(name: string, score: number) {
    const body = {
      name: name,
      game: 'snake',
      score: score
    };
    return this._http.post<Array<Score>>(sendUrl, body, { headers: this._sendHeaders });
  }

  public saveHistoryData(name: string, data: Array<GameHistory> | Options) {
    localStorage.setItem(name, JSON.stringify(data));
  }

  public readHistoryData() {
    const toRead: Array<'history' | 'options'> = ['history', 'options'];

    toRead.forEach((el) => {
      let data = JSON.parse(localStorage.getItem(el)!);
      data && (this[el] = data);
    });
  }
}
