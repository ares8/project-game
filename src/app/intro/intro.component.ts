import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  constructor(private _router: Router) {}

  public addLoginInfo() {
    this._router.navigate(['/game']);
  }
}
