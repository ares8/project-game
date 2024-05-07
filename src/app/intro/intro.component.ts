import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { Login } from '../models';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  constructor(private _router: Router, private _userInfo: UserInfoService) {}

  public addLoginInfo(data: Login) {
    this._userInfo.verifyData();
    this._userInfo.login = data;
    this._router.navigate(['/game']);
  }
}
