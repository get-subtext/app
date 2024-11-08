import { formatTextArray } from './formatTextArray';

export const formatGenres = (genres: string[], dflt: string | null = null): string => formatTextArray(genres, dflt);
