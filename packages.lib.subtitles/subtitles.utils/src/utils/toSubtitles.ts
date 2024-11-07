import { compact, map } from 'lodash-es';
import { toSubtitleBlock } from './toSubtitleBlock';

export const toSubtitleBlocks = (lines: string[]) => {
  return compact(map(lines, (l) => toSubtitleBlock(l)));
};
