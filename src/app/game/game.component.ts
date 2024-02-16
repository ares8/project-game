import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';
import { GameHistory, Login, Score } from '../models';
import { CommonModule } from '@angular/common';
import { FormComponent } from '../form/form.component';

@Component({
  selector: 'app-game',
  standalone: true,
  imports: [NgxSnakeModule, CommonModule, FormComponent],
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
  public history: Array<GameHistory> = [];
  public interval!: ReturnType<typeof setInterval>;
  public startAndStop = true;
  public rightAndLeft = true;
  public upAndDown = false;
  public reset = true;
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
    this.startAndStop = true;
  }

  public onStartButtonPressed() {
    this._snake.actionStart();
    this.status = 'play';
    this.addHistory('start');
    this.interval = setInterval(() => this.timeRecording(), 100);
    this.startAndStop = false;
    this.reset = false;
  }

  public onStopButtonPressed() {
    this._snake.actionStop();
    this.status = 'pause';
    this.addHistory('pause');
    clearInterval(this.interval);
    this.startAndStop = true;
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
    this.startAndStop = true;
    this.rightAndLeft = true;
    this.upAndDown = false;
    this.reset = true;
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
  }

  public onExitButtonPressed() {
    this.onResetButtonPressed();
    this.page = 'intro';
  }
}
