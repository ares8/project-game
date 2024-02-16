import { Component, Input } from '@angular/core';
import { Options, Score } from '../models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-scores',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './scores.component.html',
  styleUrl: './scores.component.scss',
})
export class ScoresComponent {
  @Input()
  public players!: Array<Score>;

  @Input()
  public options!: Options;
}
