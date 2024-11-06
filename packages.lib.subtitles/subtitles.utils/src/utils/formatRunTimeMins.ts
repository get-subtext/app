export const formatRunTimeMins = (runTimeMins: number | null, dflt: string | null = ''): string | null => {
  if (runTimeMins === null) return dflt;

  const hours = Math.floor(runTimeMins / 60);
  const mins = runTimeMins % 60;

  const hoursPart = hours > 0 ? `${hours}h` : '';
  const minsPart = mins > 0 ? `${mins}m` : '';

  return `${hoursPart} ${minsPart}`.trim();
};
