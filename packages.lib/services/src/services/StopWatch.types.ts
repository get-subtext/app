export interface Stopwatch {
  start(): void;
  stop(): void;
  resetTo(milliseconds: number): void;
  reset(): void;
  getElapsedTime(): void;
}
