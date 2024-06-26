export interface Login {
  name: string;
  colors: string;
}

export interface GameHistory {
  name: string;
  game: number;
  action: string;
  time: string;
  id: number;
}

export interface Options {
  names: Array<string>;
  games: Record<string, Array<number>>;
  actions: Record<string, Array<string>>;
  currentName: string;
}

export interface Score {
  name: string;
  score: number;
  position?: number;
}

export interface ActiveButtons {
  startAndStop: boolean;
  upAndDown: boolean;
  rightAndLeft: boolean;
  reset: boolean;
  status: string;
  scoresView: boolean;
  historyView: boolean;
}

export interface GameActions {
  onStartButtonPressed: () => void;
  onStopButtonPressed: () => void;
  onResetButtonPressed: () => void;
  onUpButtonPressed: () => void;
  onDownButtonPressed: () => void;
  onLeftButtonPressed: () => void;
  onRightButtonPressed: () => void;
  onScoresButtonPressed: () => void;
  onHistoryButtonPressed: () => void;
  onExitButtonPressed: () => void;
  onColorButtonPressed: () => void;
}

export interface GameInfo {
  status: string;
  time: string;
  points: number;
  colors: string;
}

export interface HistoryDisplay {
  name: string;
  game: string;
  sort: string;
  action: string;
  currentPlayer: boolean;
  currentName: string;
  allNames: Array<string>;
}

export interface ScoresDisplay {
  name: string;
  sort: string;
  currentPlayer: boolean;
  currentName: string;
  allNames: Array<string>;
}

export interface UserToken {
  success: boolean;
}
