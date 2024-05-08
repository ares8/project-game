import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { ScoresDisplay } from "../../models";

@Component({
  selector: "app-scores-options",
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: "./scores-options.component.html",
  styleUrl: "./scores-options.component.scss",
})
export class ScoresOptionsComponent {
  @Input() public toDisplay!: ScoresDisplay;
  @Output() public toDisplayChange = new EventEmitter<ScoresDisplay>();

  @Output() public action = new EventEmitter<string>();

  public reset() {
    this.action.emit();
  }
}
