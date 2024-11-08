import { Stopwatch } from './StopWatch';
import type * as T from './SubtitleStream.types';

export class SubtitleStream implements T.SubtitleStream {
  private stopwatch = new Stopwatch();

  public constructor(private readonly subtitleBlocks: T.SubtitleBlock[]) {}

  public start() {
    this.stopwatch.start();
  }

  public pause() {
    this.stopwatch.stop();
  }

  public goTo(percentage: number) {
    const runningTime = this.getRunningTime();
    const ms = Math.round((percentage * runningTime) / 100);
    this.stopwatch.resetTo(ms);
  }

  public skipToNext() {
    const elapsedTime = this.stopwatch.getElapsedTime();
    for (let i = 0; i < this.subtitleBlocks.length; i++) {
      const subtitle = this.subtitleBlocks[i];
      if (subtitle.start > elapsedTime) {
        this.stopwatch.resetTo(subtitle.start);
        return;
      }
    }

    this.stopwatch.resetTo(this.getRunningTime());
  }

  public skipToPrevious() {
    const elapsedTime = this.stopwatch.getElapsedTime();
    for (let i = this.subtitleBlocks.length - 1; i >= 0; i--) {
      const subtitle = this.subtitleBlocks[i];
      if (subtitle.end < elapsedTime) {
        this.stopwatch.resetTo(subtitle.start);
        return;
      }
    }

    this.stopwatch.resetTo(0);
  }

  public getCurrentFrame() {
    const elapsedTime = this.stopwatch.getElapsedTime();
    const subtitle = this.getCurrentSubtitle(elapsedTime);
    const progress = this.getPercentageProgress(elapsedTime);
    return { subtitle, progress };
  }

  public getRemainingTime() {
    const runningTime = this.getRunningTime();
    const elapsedTime = this.stopwatch.getElapsedTime();
    return Math.max(runningTime - elapsedTime, 0);
  }

  public getElapsedTime() {
    return this.stopwatch.getElapsedTime();
  }

  private getCurrentSubtitle(elapsedTime: number) {
    for (let i = 0; i < this.subtitleBlocks.length; i++) {
      const subtitle = this.subtitleBlocks[i];
      if (elapsedTime >= subtitle.start && elapsedTime <= subtitle.end) return this.subtitleBlocks[i].text;
    }

    return '';
  }

  private getPercentageProgress(elapsedTime: number) {
    const runningTime = this.getRunningTime();
    const percentageProgress = elapsedTime === 0 ? 0 : (Math.min(elapsedTime, runningTime) / runningTime) * 100;
    return percentageProgress;
  }

  private getRunningTime() {
    const oneMinute = 1000 * 60 * 1;
    const lastSubtitleEnd = this.subtitleBlocks[this.subtitleBlocks.length - 1].end;
    const runningTime = lastSubtitleEnd + oneMinute;
    return runningTime;
  }
}
