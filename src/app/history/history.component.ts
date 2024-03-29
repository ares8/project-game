import { Component, Input } from '@angular/core';
import { GameHistory, Options } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterAndSortHistoryPipe } from '../pipes/filter-and-sort-history.pipe';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterAndSortHistoryPipe],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  @Input()
  public players!: Array<GameHistory>;

  @Input()
  public options!: Options;

  public name = 'All';
  public game = 'All';
  public sort = 'Desc';
  public action = 'All';
  public currentPlayer = false;

  public reset() {
    this.game = 'All';
    this.sort = 'Desc';
    this.action = 'All';
  }

  public resetAction() {
    this.action = 'All';
  }
}
