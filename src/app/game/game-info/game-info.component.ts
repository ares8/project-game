import { Component, Input } from '@angular/core';
import { GameInfo } from '../../models';

@Component({
  selector: 'app-game-info',
  standalone: true,
  imports: [],
  templateUrl: './game-info.component.html',
  styleUrl: './game-info.component.scss',
})
export class GameInfoComponent {
  @Input() public info!: GameInfo;
}
