import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { GameHistory, Score } from '../models';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgxSnakeModule],
  templateUrl: './game.component.html',
  styleUrl: './game.component.scss',
})
export class GameComponent {
  @ViewChild(NgxSnakeComponent)
  private _snake!: NgxSnakeComponent;

  public points = 0;
  public scores: Array<Score> = [];
  public status = 'ready';
  public seconds = 0;
  public minutes = 0;
  public hours = 0;
  public time = '00:00:00';
  public history: Array<GameHistory> = [];
  public interval!: ReturnType<typeof setInterval>;
  public name = '';
  public game = 1;

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

    this.time = `${hoursView}:${minutesView}:${secondsView}`;
  }

  public addScore() {
    this.scores.push({
      name: this.name,
      points: this.points,
      time: this.time,
    });
  }

  public addHistory(action: string) {
    this.history.push({
      name: this.name,
      game: this.game,
      action: action,
      time: this.time,
    });
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
  }

  public onStartButtonPressed() {
    this._snake.actionStart();
    this.status = 'play';
    this.addHistory('start');
    this.interval = setInterval(() => this.timeRecording(), 100);
  }

  public onStopButtonPressed() {
    this._snake.actionStop();
    this.status = 'pause';
    this.addHistory('pause');
    clearInterval(this.interval);
  }

  public onResetButtonPressed() {
    this._snake.actionReset();
    this.addScore();
    this.addHistory('reset');
    this.status = 'ready';
    this.points = 0;
    clearInterval(this.interval);
    this.seconds = 0;
    this.minutes = 0;
    this.hours = 0;
    this.time = '00:00:00';
  }

  public onUpButtonPressed() {
    this._snake.actionUp();
    this.addHistory('up');
  }

  public onDownButtonPressed() {
    this._snake.actionDown();
    this.addHistory('down');
  }

  public onLeftButtonPressed() {
    this._snake.actionLeft();
    this.addHistory('left');
  }

  public onRightButtonPressed() {
    this._snake.actionRight();
    this.addHistory('right');
  }
}
