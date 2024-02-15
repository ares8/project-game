import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { Score } from '../models';

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
  public name = '';

  public timeRecording() {
    this.seconds += 0.1;
    if (this.seconds > 59) {
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
      this.seconds < 10
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

  public onGrow() {
    this.points++;
  }

  public onGameOver() {}

  public onStartButtonPressed() {
    this._snake.actionStart();
  }

  public onStopButtonPressed() {
    this._snake.actionStop();
  }

  public onResetButtonPressed() {
    this._snake.actionReset();
  }

  public onUpButtonPressed() {
    this._snake.actionUp();
  }

  public onDownButtonPressed() {
    this._snake.actionDown();
  }

  public onLeftButtonPressed() {
    this._snake.actionLeft();
  }

  public onRightButtonPressed() {
    this._snake.actionRight();
  }
}
