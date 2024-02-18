import { Pipe, PipeTransform } from '@angular/core';
import { Score } from '../models';

@Pipe({
  name: 'filterAndSortScores',
  standalone: true,
})
export class FilterAndSortScoresPipe implements PipeTransform {
  transform(players: Array<Score>, sort: string, name: string) {
    players
      .sort((a, b) => {
        if (a.points === b.points) {
          return a.totalTimeInSeconds - b.totalTimeInSeconds;
        }
        return b.points - a.points;
      })
      .map((player, i) => (player.position = i + 1));

    sort === 'Desc'
      ? players.sort((a, b) => a.position - b.position)
      : players.sort((a, b) => b.position - a.position);

    if (name === 'All') {
      return players;
    }

    return players.filter((player) => player.name === name);
  }
}
