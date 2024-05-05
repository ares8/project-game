import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {}
