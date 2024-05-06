export interface Login {
  name: string;
  email: string;
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
  points: number;
  time: string;
  totalTimeInSeconds: number;
  position: number;
}

export interface ActiveButtons {
  startAndStop: boolean;
  upAndDown: boolean;
  rightAndLeft: boolean;
  reset: boolean;
  status: string;
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
}

export interface GameInfo {
  status: string;
  time: string;
  points: number;
}
