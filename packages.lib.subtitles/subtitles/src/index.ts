import { SubtitleStream as SubtitleStreamImpl } from './services/SubtitleStream';
import type { SubtitleBlock, SubtitleStream } from './services/SubtitleStream.types';

export type * from './services/SubtitleStream.types';

export interface SubtitleStreamOptions {
  subtitleBlocks: SubtitleBlock[];
}

export class SubtitleStreamFactory {
  private constructor() {}

  public static create({ subtitleBlocks }: SubtitleStreamOptions): SubtitleStream {
    return new SubtitleStreamImpl(subtitleBlocks);
  }
}
