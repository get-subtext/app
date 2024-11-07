import { join, trim } from 'lodash-es';

export const toSubtitleBlock = (input: string) => {
  const [startRaw, endRaw, ...textRaw] = input.split(' ');
  const start = parseInt(startRaw, 10);
  const end = parseInt(endRaw, 10);
  const text = trim(join(textRaw, ' '));
  return { start, end, text };
};
