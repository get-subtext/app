export const formatReleaseYear = (releaseDate: string | null, releaseYear: number | null, dflt: string | null = null): string | null => {
  if (releaseDate !== null) return releaseDate.substring(0, 4);
  if (releaseYear !== null) return releaseYear.toString();
  return dflt;
};
