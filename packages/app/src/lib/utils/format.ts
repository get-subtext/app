export const formatReleaseYear = (releaseDate: string | null, releaseYear: number | null, dflt: string | null = ''): string | null => {
  if (releaseDate !== null) return releaseDate.substring(0, 4);
  if (releaseYear !== null) return releaseYear.toString();
  return dflt;
};

export const formatRated = (rated: string | null, dflt = ''): string => {
  if (rated === null) return dflt;
  if (rated === 'N/A') return dflt;
  if (rated === 'Not Rated') return dflt;
  return rated;
};

export const formatText = (text: string | null, dflt = ''): string => (text === null ? dflt : text);

export const formatTextArray = (text: string[], dflt = ''): string => (text.length === 0 ? dflt : text.join(', '));

export const formatRunTimeMins = (runTimeMins: number | null, dflt: string | null = ''): string | null => {
  if (runTimeMins === null) return dflt;

  const hours = Math.floor(runTimeMins / 60);
  const mins = runTimeMins % 60;

  const hoursPart = hours > 0 ? `${hours}h` : '';
  const minsPart = mins > 0 ? `${mins}m` : '';

  return `${hoursPart} ${minsPart}`.trim();
};

export const formatMsAsTime = (ms: number) => {
  const hours = Math.floor(ms / (1000 * 60 * 60));
  const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((ms % (1000 * 60)) / 1000);

  const hoursStr = hours.toString();
  const minutesStr = (minutes < 10 ? '0' : '') + minutes.toString();
  const secondsStr = (seconds < 10 ? '0' : '') + seconds.toString();

  return `${hoursStr}:${minutesStr}:${secondsStr}`;
};
