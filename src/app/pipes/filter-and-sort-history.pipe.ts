import { Pipe, PipeTransform } from '@angular/core';
import { GameHistory } from '../models';

@Pipe({
  name: 'filterAndSortHistory',
  standalone: true,
})
export class FilterAndSortHistoryPipe implements PipeTransform {
  transform(
    players: Array<GameHistory>,
    name: string,
    game: number | string,
    action: string,
    sort: string
  ) {
    const filterData = (key: string, value: string | number) => {
      value !== 'All' &&
        (players = players.filter(
          (player) => player[key as keyof GameHistory] == value
        ));
    };

    filterData('name', name);
    filterData('game', game);
    filterData('action', action);

    sort === 'Desc'
      ? players.sort((a, b) => b.id - a.id)
      : players.sort((a, b) => a.id - b.id);

    return players;
  }
}
