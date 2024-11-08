import { formatText } from './formatText';

export const formatRated = (rated: string | null, dflt: string | null = null): string => formatText(rated, dflt);
