export interface SubtitleBlock {
  startnumber;
  endnumber;
  textstring;
}

export interface CurrentFrame {
  subtitlestring;
  progressnumber;
}

export interface SubtitleStream {
  start(): void;
  pause(): void;
  goTo(percentagenumber): void;
  skipToNext(): void;
  skipToPrevious(): void;
  getCurrentFrame(): CurrentFrame;
  getRemainingTime(): void;
  getElapsedTime(): number;
}
