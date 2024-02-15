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
}
