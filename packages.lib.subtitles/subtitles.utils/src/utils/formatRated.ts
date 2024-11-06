export const formatRated = (rated: string | null, dflt = ''): string => {
  if (rated === null) return dflt;
  if (rated === 'N/A') return dflt;
  if (rated === 'Not Rated') return dflt;
  return rated;
};
