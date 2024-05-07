import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { ActiveButtons, GameActions } from '../models';

@Component({
  selector: 'app-buttons',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './buttons.component.html',
  styleUrl: './buttons.component.scss',
})
export class ButtonsComponent {
  @Input() public validation!: boolean | null;
  @Input() public block!: boolean | null;
  @Input() public active!: ActiveButtons | null;

  @Output() public action = new EventEmitter<keyof GameActions>();

  public addAction(action: keyof GameActions) {
    this.action.emit(action);
  }
}
