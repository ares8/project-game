import { CommonModule } from '@angular/common';
import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { FormComponent } from '../intro/form/form.component';
import { HistoryComponent } from '../history/history.component';
import { ScoresComponent } from '../scores/scores.component';
import { GameHistory, Login, Options, Score } from '../models';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [
    NgxSnakeModule,
    CommonModule,
    FormComponent,
    HistoryComponent,
    ScoresComponent,
  ],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public page = 'intro';
  public points = 0;
  public scores: Array<Score> = [];
  public status = 'ready';
  public seconds = 0;
  public minutes = 0;
  public hours = 0;
  public time = '00:00:00';
  public totalTimeInSeconds = 0;
  public history: Array<GameHistory> = [];
  public interval!: ReturnType<typeof setInterval>;
  public startAndStop = true;
  public rightAndLeft = true;
  public upAndDown = false;
  public reset = true;
  public name = '';
  public game = 1;
  public options: Options = {
    names: [],
    games: {},
    actions: {},
    currentName: '',
  };
  public historyId = 0;
  public message = "IF YOU ARE READY PRESS 'START'";

  public timeRecording() {
    this.seconds += 0.1;
    this.totalTimeInSeconds += 0.1;
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

    this.time = `${hoursView}:${minutesView}:${secondsView}`;
  }

  public addScore() {
    this.scores.push({
      name: this.name,
      points: this.points,
      time: this.time,
      totalTimeInSeconds: this.totalTimeInSeconds,
      position: 0,
    });
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
    this.history.push({
      name: this.name,
      game: this.game,
      action: action,
      time: this.time,
      id: this.historyId,
    });
    this.historyId++;

    if (action === 'start') {
      if (!this.options.names.includes(this.name)) {
        this.options.names.push(this.name);
      }

      this.addOption(this.options.games, this.name, this.game);
      this.addOption(this.options.games, 'All', this.game);
    }

    this.addOption(this.options.actions, this.name + this.game, action);
    this.addOption(this.options.actions, 'All' + this.game, action);
    this.addOption(this.options.actions, this.name + 'All', action);
    this.addOption(this.options.actions, 'AllAll', action);
  }

  public onGrow() {
    this.points++;
    this.addHistory('grow');
  }

  public onGameOver() {
    this.addScore();
    this.status = 'game over';
    this.addHistory('game over');
    clearInterval(this.interval);
    this.startAndStop = true;
    this.message = 'YOU LOST :( TRY AGAIN';
  }

  public onStartButtonPressed() {
    if (this.status !== 'pause') {
      this.onResetButtonPressed();
      this.game = 1;
      if (this.options.games?.[this.name]) {
        const lastGameIndex = this.options.games[this.name].length - 1;
        this.game = this.options.games[this.name][lastGameIndex] + 1;
      }
    }

    this._snake.actionStart();
    this.status = 'play';
    this.addHistory('start');
    this.interval = setInterval(() => this.timeRecording(), 100);
    this.startAndStop = false;
    this.reset = false;
    this.message = 'GOOD LUCK!';
  }

  public onStopButtonPressed() {
    this._snake.actionStop();
    this.status = 'pause';
    this.addHistory('pause');
    clearInterval(this.interval);
    this.startAndStop = true;
    this.message = 'YOU MUST REST?';
  }

  public onResetButtonPressed() {
    this._snake.actionReset();
    if (this.status === 'play' || this.status === 'pause') {
      this.addHistory('reset');
      this.addScore();
    }
    this.status = 'ready';
    this.points = 0;
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.totalTimeInSeconds = 0;
    this.time = '00:00:00';
    this.startAndStop = true;
    this.rightAndLeft = true;
    this.upAndDown = false;
    this.reset = true;
    this.message = "IF YOU ARE READY PRESS 'START'";
  }

  public onUpButtonPressed() {
    this._snake.actionUp();
    this.addHistory('up');
    this.upAndDown = true;
    this.rightAndLeft = false;
  }

  public onDownButtonPressed() {
    this._snake.actionDown();
    this.addHistory('down');
    this.upAndDown = true;
    this.rightAndLeft = false;
  }

  public onLeftButtonPressed() {
    this._snake.actionLeft();
    this.addHistory('left');
    this.upAndDown = false;
    this.rightAndLeft = true;
  }

  public onRightButtonPressed() {
    this._snake.actionRight();
    this.addHistory('right');
    this.upAndDown = false;
    this.rightAndLeft = true;
  }

  public addLoginInfo(player: Login) {
    this.page = 'main page';
    this.name = player.name;
    this.options.currentName = player.name;
  }

  public onExitButtonPressed() {
    if (this.page === 'scores page' || this.page === 'history page') {
      this.page = 'main page';
      this.message = "IF YOU ARE READY PRESS 'START'";
      return;
    }
    if (this.status === 'play' || this.status === 'pause') {
      this.addScore();
      this.addHistory('exit');
    }
    this.status = 'exit';
    this.onResetButtonPressed();
    this.page = 'intro';
  }

  public displayScores() {
    if (this.page !== 'scores page') {
      this.page = 'scores page';
      this.message = "PRESS 'SCORES' OR 👇 TO RETURN";
    } else {
      this.page = 'main page';
      this.message = "IF YOU ARE READY PRESS 'START'";
    }
  }

  public displayHistory() {
    if (this.page !== 'history page') {
      this.page = 'history page';
      this.message = "PRESS 'HISTORY' OR 👇 TO RETURN";
    } else {
      this.page = 'main page';
      this.message = "IF YOU ARE READY PRESS 'START'";
    }
  }
}
