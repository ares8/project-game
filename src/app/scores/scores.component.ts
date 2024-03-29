import { Component, Input } from '@angular/core';
import { Options, Score } from '../models';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FilterAndSortScoresPipe } from '../pipes/filter-and-sort-scores.pipe';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule, FormsModule, FilterAndSortScoresPipe],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent {
  @Input()
  public players!: Array<Score>;

  @Input()
  public options!: Options;

  public name = 'All';
  public sort = 'Desc';
  public currentPlayer = false;

  public reset() {
    this.sort = 'Desc';
  }
}
