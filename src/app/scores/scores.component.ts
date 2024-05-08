import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FilterAndSortScoresPipe } from '../pipes/filter-and-sort-scores.pipe';
import { Options, Score, ScoresDisplay } from '../models';
import { StatisticsService } from '../services/statistics.service';
import { ScoresOptionsComponent } from './scores-options/scores-options.component';
import { ScoresListComponent } from './scores-list/scores-list.component';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ScoresOptionsComponent,
    ScoresListComponent,
  ],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent {
  public players: Array<Score> = [];

  public toDisplay: ScoresDisplay = {
    name: 'All',
    sort: 'Desc',
    currentPlayer: false,
    currentName: '',
    allNames: [],
  };

  public constructor(private _stats: StatisticsService) {
    this.toDisplay.currentName = this._stats.options.currentName;

    this.players = this._stats.scores;
    this.players.forEach((player) => {
      !this.toDisplay.allNames.includes(player.name) &&
        this.toDisplay.allNames.push(player.name);
    });
  }

  public reset() {
    this.toDisplay.sort = 'Desc';
  }

  public changeName() {
    this.toDisplay.currentPlayer
      ? (this.toDisplay.name = this.toDisplay.currentName)
      : (this.toDisplay.name = 'All');
    this.reset();
  }
}
