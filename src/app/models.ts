export interface Login {
  name: string;
  email: string;
}

export interface GameHistory {
  name: string;
  game: number;
  action: string;
  time: string;
}

export interface Options {
  names: Array<string>;
  games: Record<string, Array<number>>;
  actions: Record<string, Array<string>>;
}

export interface Score {
  name: string;
  points: number;
  time: string;
  totalTimeInSeconds: number;
  position: number;
}
