import { Component, ViewChild } from '@angular/core';
import { NgxSnakeComponent, NgxSnakeModule } from 'ngx-snake';

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

  public onGrow() {
    console.log('grow');
  }

  public onGameOver() {
    alert('game over');
  }

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
