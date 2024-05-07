import { Component, EventEmitter, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Login } from '../../models';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '../../buttons/buttons.component';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [FormsModule, CommonModule, ButtonsComponent],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() loginInfo = new EventEmitter<Login>();

  public submitLoginInfo(data: Login) {
    this.loginInfo.emit(data);
  }
}
