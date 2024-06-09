import { Component, EventEmitter, Output, inject } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { ButtonsComponent } from '../../buttons/buttons.component';
import { UserInfoService } from '../../services/user-info.service';
import { Observable, map } from 'rxjs';

@Component({
  selector: 'app-form',
  standalone: true,
  imports: [CommonModule, ButtonsComponent, ReactiveFormsModule],
  templateUrl: './form.component.html',
  styleUrl: './form.component.scss',
})
export class FormComponent {
  @Output() loginInfo = new EventEmitter<FormGroup>();

  public submitLoginInfo(data: FormGroup) {
    this.loginInfo.emit(data);
  }

  @Output() currentColors = new EventEmitter<string>();

  public onColorsChange(colors: string) {
    this.currentColors.emit(colors);
  }

  private _fb = inject(FormBuilder);

  public snakeForm = this._fb.group({
    name: [
      '',
      [
        Validators.required,
        Validators.minLength(5),
        Validators.maxLength(20),
        Validators.pattern(/^\S+[\S\s]*\S+$/),
      ],
    ],
    token: [
      '',
      {
        validators: [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(4),
        ],
        asyncValidators: [
          (control: FormControl) => {
            return this._userInfo.checkToken(control.value)
              .pipe(
                map((valid) => {
                  if (!valid.success) {
                    return { externalValidationFailed: true };
                  }
                  return null;
                })
              );
          },
        ],
      },
    ],
    colors: ['normal', []],
  });

  constructor(private _userInfo: UserInfoService) {
    this.colors.valueChanges.subscribe((currentColors) => {
      (async () => {
        await this.colors.value;
        this.onColorsChange(currentColors!);
      })();
    });

    if (this._userInfo.login) {
      this.snakeForm.patchValue({
        name: this._userInfo.login.name,
        colors: this._userInfo.login.colors,
      });

      this._userInfo.reset();
    }
  }

  public get name() {
    return this.snakeForm.controls['name'];
  }

  public get colors() {
    return this.snakeForm.controls['colors'];
  }

  public get token() {
    return this.snakeForm.controls['token'];
  }
}
