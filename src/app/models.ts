export interface Login {
  name: string;
  email: string;
}

export interface Score {
  name: string;
  points: number;
  time: string;
}

export interface GameHistory {
  name: string;
  game: number;
  action: string;
  time: string;
}
