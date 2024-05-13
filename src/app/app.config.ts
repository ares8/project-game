import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';
import { HistoryComponent } from './history/history.component';
import { provideHttpClient } from '@angular/common/http';
import { loginVerificationGuard } from './login-verification.guard';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'intro', component: IntroComponent },
      {
        path: 'game/:colors',
        component: GameComponent,
        canActivate: [loginVerificationGuard],
        children: [
          {
            path: 'scores',
            component: ScoresComponent,
            canActivate: [loginVerificationGuard],
          },
          {
            path: 'history',
            component: HistoryComponent,
            canActivate: [loginVerificationGuard],
          },
        ],
      },
      { path: '**', redirectTo: 'intro' },
    ]),
    provideHttpClient(),
  ],
};
