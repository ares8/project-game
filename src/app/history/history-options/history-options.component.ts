import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HistoryDisplay, Options } from '../../models';

@Component({
  selector: 'app-history-options',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './history-options.component.html',
  styleUrl: './history-options.component.scss',
})
export class HistoryOptionsComponent {
  @Input() public options!: Options;

  @Input() public toDisplay!: HistoryDisplay;
  @Output() public toDisplayChange = new EventEmitter<HistoryDisplay>();

  @Output() public action = new EventEmitter<string>();

  public reset(value: string) {
    this.action.emit(value);
  }
}
