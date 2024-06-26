import { CommonModule } from '@angular/common';
import { Component, OnDestroy, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { HistoryComponent } from '../history/history.component';
import { ScoresComponent } from '../scores/scores.component';
import { ActiveButtons, GameActions, GameInfo } from '../models';
import { ButtonsComponent } from '../buttons/buttons.component';
import { GameInfoComponent } from './game-info/game-info.component';
import { ActivatedRoute, Router, RouterOutlet } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { StatisticsService } from '../services/statistics.service';
import { Subscription, concatMap, filter } from 'rxjs';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NgxSnakeModule,
    CommonModule,
    HistoryComponent,
    ScoresComponent,
    ButtonsComponent,
    GameInfoComponent,
    RouterOutlet,
    FormsModule,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent implements OnDestroy {
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  @ViewChild(RouterOutlet)
  private _childComponent!: RouterOutlet;

  private _sub$!: Subscription;
  public refreshFlag = true;
  public colors = '';
  public seconds = 0;
  public minutes = 0;
  public hours = 0;
  public interval!: ReturnType<typeof setInterval>;
  public name = '';
  public game = 1;
  public message = "IF YOU ARE READY PRESS 'START'";
  public gameInfo: GameInfo = {
    status: 'ready',
    time: '00:00:00',
    points: 1000,
    colors: '',
  };
  public active: ActiveButtons = {
    startAndStop: true,
    upAndDown: false,
    rightAndLeft: true,
    reset: true,
    status: 'ready',
    scoresView: false,
    historyView: false,
  };

  public constructor(
    private _router: Router,
    private _route: ActivatedRoute,
    private _userInfo: UserInfoService,
    private _stats: StatisticsService
  ) {
    this._stats.readHistoryData();

    this.name = this._userInfo.login.name;
    this._stats.options.currentName = this.name;

    this._route.params.subscribe((params) => {
      this.colors = params['colors'];
      this.gameInfo.colors = this.colors;
      this._userInfo.login = { name: this.name, colors: this.colors };
    });

    this._sub$ = this._stats.timer$
      .pipe(
        filter(() => this.refreshFlag),
        concatMap(() => {
          return this._stats.scores$;
        })
      )
      .subscribe((data) => {
        this._stats.scores = data;
        this.refreshScores();
      });
  }

  ngOnDestroy() {
    this._sub$.unsubscribe();
  }

  public refreshScores() {
    if (this._childComponent?.isActivated) {
      const childComponent = this._childComponent.component;
      if (childComponent instanceof ScoresComponent) {
        childComponent.reload();
      }
    }
  }

  public addStatus(status: string) {
    this.active.status = status;
    this.gameInfo.status = status;
  }

  public timeRecording() {
    this.seconds += 0.1;
    if (this.seconds > 59.99) {
      this.minutes++;
      this.seconds = 0;
    }
    if (this.minutes > 59) {
      this.hours++;
      this.minutes = 0;
    }
    const hoursView = this.hours < 10 ? '0' + this.hours : this.hours;
    const minutesView = this.minutes < 10 ? '0' + this.minutes : this.minutes;
    const secondsView =
      this.seconds < 9.99
        ? '0' + this.seconds.toFixed(1)
        : this.seconds.toFixed(1);

    this.gameInfo.time = `${hoursView}:${minutesView}:${secondsView}`;
  }

  public addScore() {
    if (this.gameInfo.points) {
      this._stats
        .sendScore(this.name, this.gameInfo.points)
        .subscribe();
    }
  }

  public addOption(
    obj: Record<string, Array<number | string>>,
    key: string,
    value: string | number
  ) {
    if (!obj[key]) {
      obj[key] = [];
      obj[key].push(value);
    } else if (!obj[key].includes(value)) {
      obj[key].push(value);
    }
  }

  public addHistory(action: string) {
    this._stats.history.push({
      name: this.name,
      game: this.game,
      action: action,
      time: this.gameInfo.time,
      id: this._stats.history.length,
    });

    if (action === 'start') {
      if (!this._stats.options.names.includes(this.name)) {
        this._stats.options.names.push(this.name);
      }

      this.addOption(this._stats.options.games, this.name, this.game);
      this.addOption(this._stats.options.games, 'All', this.game);
    }

    this.addOption(this._stats.options.actions, this.name + this.game, action);
    this.addOption(this._stats.options.actions, 'All' + this.game, action);
    this.addOption(this._stats.options.actions, this.name + 'All', action);
    this.addOption(this._stats.options.actions, 'AllAll', action);

    this._stats.saveHistoryData('history', this._stats.history);
    this._stats.saveHistoryData('options', this._stats.options);
  }

  public onGrow() {
    this.gameInfo.points++;
    this.addHistory('grow');
  }

  public onGameOver() {
    this.addScore();
    this.addStatus('game over');
    this.addHistory('game over');
    clearInterval(this.interval);
    this.active.startAndStop = true;
    this.message = 'YOU LOST :( TRY AGAIN';
  }

  public onStartButtonPressed() {
    if (this.active.status !== 'pause') {
      this.onResetButtonPressed();
      this.game = 1;
      if (this._stats.options.games?.[this.name]) {
        const lastGameIndex = this._stats.options.games[this.name].length - 1;
        this.game = this._stats.options.games[this.name][lastGameIndex] + 1;
      }
    }

    this._snake.actionStart();
    this.addStatus('play');
    this.addHistory('start');
    this.interval = setInterval(() => this.timeRecording(), 100);
    this.active.startAndStop = false;
    this.active.reset = false;
    this.message = 'GOOD LUCK!';
  }

  public onStopButtonPressed() {
    this._snake.actionStop();
    this.addStatus('pause');
    this.addHistory('pause');
    clearInterval(this.interval);
    this.active.startAndStop = true;
    this.message = 'YOU MUST REST?';
  }

  public onResetButtonPressed() {
    this._snake.actionReset();
    if (this.active.status === 'play' || this.active.status === 'pause') {
      this.addHistory('reset');
      this.addScore();
    }
    this.addStatus('ready');
    this.gameInfo.points = 1000;
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.gameInfo.time = '00:00:00';
    this.active.startAndStop = true;
    this.active.rightAndLeft = true;
    this.active.upAndDown = false;
    this.active.reset = true;
    this.message = "IF YOU ARE READY PRESS 'START'";
  }

  public onUpButtonPressed() {
    this._snake.actionUp();
    this.addHistory('up');
    this.active.upAndDown = true;
    this.active.rightAndLeft = false;
  }

  public onDownButtonPressed() {
    this._snake.actionDown();
    this.addHistory('down');
    this.active.upAndDown = true;
    this.active.rightAndLeft = false;
  }

  public onLeftButtonPressed() {
    this._snake.actionLeft();
    this.addHistory('left');
    this.active.upAndDown = false;
    this.active.rightAndLeft = true;
  }

  public onRightButtonPressed() {
    this._snake.actionRight();
    this.addHistory('right');
    this.active.upAndDown = false;
    this.active.rightAndLeft = true;
  }

  public onExitButtonPressed() {
    if (this.active.scoresView || this.active.historyView) {
      this.active.scoresView = false;
      this.active.historyView = false;
      this._router.navigate(['/game', this.colors]);
      this.message = "IF YOU ARE READY PRESS 'START'";
      return;
    }
    if (this.active.status === 'play' || this.active.status === 'pause') {
      this.addScore();
      this.addHistory('exit');
    }
    this.addStatus('exit');
    this.onResetButtonPressed();
    this._router.navigate(['/intro']);
  }

  public onScoresButtonPressed() {
    if (!this.active.scoresView) {
      this.active.scoresView = true;
      this.active.historyView = false;
      this.message = "PRESS 'SCORES' OR 👇 TO RETURN";
      this._router.navigate(['/game', this.colors, 'scores']);
    } else {
      this.active.scoresView = false;
      this._router.navigate(['/game', this.colors]);
      this.message = "IF YOU ARE READY PRESS 'START'";
    }
  }

  public onHistoryButtonPressed() {
    if (!this.active.historyView) {
      this.active.historyView = true;
      this.active.scoresView = false;
      this.message = "PRESS 'HISTORY' OR 👇 TO RETURN";
      this._router.navigate(['/game', this.colors, 'history']);
    } else {
      this.active.historyView = false;
      this._router.navigate(['/game', this.colors]);
      this.message = "IF YOU ARE READY PRESS 'START'";
    }
  }

  public onColorButtonPressed() {
    let currentColors = '';

    this.colors === 'normal'
      ? (currentColors = 'high')
      : (currentColors = 'normal');

    this._router.navigate(['/game', currentColors]);
  }

  public onAction(action: keyof GameActions) {
    this[action]();
  }
}
