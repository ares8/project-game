import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';
import { IntroComponent } from './intro/intro.component';
import { GameComponent } from './game/game.component';
import { ScoresComponent } from './scores/scores.component';
import { HistoryComponent } from './history/history.component';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter([
      { path: 'intro', component: IntroComponent },
      {
        path: 'game',
        component: GameComponent,
        children: [
          {
            path: 'scores',
            component: ScoresComponent,
          },
          {
            path: 'history',
            component: HistoryComponent,
          },
        ],
      },
      { path: '**', redirectTo: 'intro' },
    ]),
  ],
};
