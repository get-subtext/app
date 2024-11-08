import type { SubtitleStreamOptions } from './index.types';
import { SubtitleStream as SubtitleStreamImpl } from './services/SubtitleStream';
import type { SubtitleStream } from './services/SubtitleStream.types';

export type * from './index.types';
export type * from './services/SubtitleStream.types';

export class SubtitleStreamFactory {
  private constructor() {}

  public static create({ subtitleBlocks }: SubtitleStreamOptions): SubtitleStream {
    return new SubtitleStreamImpl(subtitleBlocks);
  }
}
