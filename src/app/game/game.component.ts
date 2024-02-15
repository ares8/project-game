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
  public time = '00:00:00';
  public name = '';

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
