import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterAndSortScoresPipe } from '../../pipes/filter-and-sort-scores.pipe';
import { Score, ScoresDisplay } from '../../models';

@Component({
  selector: 'app-scores-list',
  standalone: true,
  imports: [CommonModule, FilterAndSortScoresPipe],
  templateUrl: './scores-list.component.html',
  styleUrl: './scores-list.component.scss',
})
export class ScoresListComponent {
  @Input() public players!: Array<Score>;
  @Input() public toDisplay!: ScoresDisplay;
}
