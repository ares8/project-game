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

  public addLoginInfo(userData: Login) {
    this._userInfo.checkToken(userData.token).subscribe((data) => {
      if (!data.success) {
        alert('Token must have 4 digits!');
      } else {
        this._userInfo.verifyLogin();
        this._userInfo.login = userData;

        const colors = userData.colors;
        this._router.navigate(['/game', colors]);
      }
    });
  }
}
