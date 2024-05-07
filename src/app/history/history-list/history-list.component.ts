import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FilterAndSortHistoryPipe } from '../../pipes/filter-and-sort-history.pipe';
import { GameHistory, HistoryDisplay } from '../../models';

@Component({
  selector: 'app-history-list',
  standalone: true,
  imports: [CommonModule, FilterAndSortHistoryPipe],
  templateUrl: './history-list.component.html',
  styleUrl: './history-list.component.scss',
})
export class HistoryListComponent {
  @Input() public players!: Array<GameHistory>;
  @Input() public toDisplay!: HistoryDisplay;
}
