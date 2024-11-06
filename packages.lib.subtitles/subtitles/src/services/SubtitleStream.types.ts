export interface SubtitleBlock {
  start: number;
  end: number;
  text: string;
}

export interface CurrentFrame {
  subtitle: string;
  progress: number;
}

export interface SubtitleStream {
  start: () => void;
  pause: () => void;
  goTo: (percentage: number) => void;
  skipToNext: () => void;
  skipToPrevious: () => void;
  getCurrentFrame: () => CurrentFrame;
  getRemainingTime: () => void;
  getElapsedTime: () => number;
}
