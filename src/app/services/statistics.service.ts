import { Injectable } from '@angular/core';
import { GameHistory, Options, Score } from '../models';

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
}
