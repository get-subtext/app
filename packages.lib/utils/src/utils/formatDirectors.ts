import { formatTextArray } from './formatTextArray';

export const formatDirectors = (directors: string[], dflt: string | null = null): string => formatTextArray(directors, dflt);
