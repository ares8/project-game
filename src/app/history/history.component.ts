import { Component, Input } from '@angular/core';
import { GameHistory } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  @Input()
  public players!: Array<GameHistory>;
}
