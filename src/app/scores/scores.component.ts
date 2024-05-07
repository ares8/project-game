import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { FilterAndSortScoresPipe } from "../pipes/filter-and-sort-scores.pipe";
import { Options, Score } from "../models";
import { StatisticsService } from "../services/statistics.service";

@Component({
  selector: "app-scores",
  standalone: true,
  imports: [CommonModule, FormsModule, FilterAndSortScoresPipe],
  templateUrl: "./scores.component.html",
  styleUrl: "./scores.component.scss",
})
export class ScoresComponent {
  public players!: Array<Score>;
  public options!: Options;

  public constructor(private _stats: StatisticsService) {
    this.players = this._stats.scores;
    this.options = this._stats.options;
  }

  public name = "All";
  public sort = "Desc";
  public currentPlayer = false;

  public reset() {
    this.sort = "Desc";
  }
}
