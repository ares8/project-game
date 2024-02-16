import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../models';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  public name = '';
  public email = '';

  @Output()
  public submit = new EventEmitter<Login>();

  public onSubmitPressed() {
    const loginInfo = {
      name: this.name,
      email: this.email,
    };
    this.submit.emit(loginInfo);

    this.name = '';
    this.email = '';
  }
}
