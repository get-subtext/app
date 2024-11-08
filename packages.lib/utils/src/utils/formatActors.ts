import { formatTextArray } from './formatTextArray';

export const formatActors = (actors: string[], dflt: string | null = null): string => formatTextArray(actors, dflt);
