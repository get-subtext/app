import { formatTextArray } from './formatTextArray';

export const formatWriters = (writers: string[], dflt: string | null = null): string => formatTextArray(writers, dflt);
