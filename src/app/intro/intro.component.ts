import { Component } from '@angular/core';
import { FormComponent } from './form/form.component';
import { Router } from '@angular/router';
import { UserInfoService } from '../services/user-info.service';
import { FormGroup } from '@angular/forms';
import { StatisticsService } from '../services/statistics.service';

@Component({
  selector: 'app-intro',
  standalone: true,
  imports: [FormComponent],
  templateUrl: './intro.component.html',
  styleUrl: './intro.component.scss',
})
export class IntroComponent {
  public theme = 'normal';

  constructor(private _router: Router, private _userInfo: UserInfoService, private _stats: StatisticsService) { }

  public addLoginInfo(data: FormGroup) {
    const { token, name, colors } = data.value;

    this._userInfo.login = { name, colors };
    this._userInfo.token = token;
    this._stats.createSendHeaders(token);

    this._router.navigate(['/game', colors]);
  }

  public changeColors(colors: string) {
    this.theme = colors;
  }
}
