import { Component, Input } from '@angular/core';
import { HistoryDisplay, GameHistory, Options } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterAndSortHistoryPipe } from '../pipes/filter-and-sort-history.pipe';
import { StatisticsService } from '../services/statistics.service';
import { HistoryOptionsComponent } from './history-options/history-options.component';
import { HistoryListComponent } from './history-list/history-list.component';

@Component({
  selector: 'app-history',
  standalone: true,
  imports: [FormsModule, HistoryOptionsComponent, HistoryListComponent],
  templateUrl: './history.component.html',
  styleUrl: './history.component.scss',
})
export class HistoryComponent {
  public players: Array<GameHistory> = [];
  public options!: Options;

  public toDisplay: HistoryDisplay = {
    name: 'All',
    game: 'All',
    sort: 'Desc',
    action: 'All',
    currentPlayer: false,
  };

  constructor(private _stats: StatisticsService) {
    this.players = this._stats.history;
    this.options = this._stats.options;
  }

  public reset(value: string) {
    if (value === 'all') {
      this.toDisplay.game = 'All';
      this.toDisplay.sort = 'Desc';
    }

    this.toDisplay.action = 'All';
  }

  public changeName() {
    this.toDisplay.currentPlayer
      ? (this.toDisplay.name = this.options.currentName)
      : (this.toDisplay.name = 'All');
    this.reset('all');
  }
}
