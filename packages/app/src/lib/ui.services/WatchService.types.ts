export interface MovieWatch {
  imdbId: string;
  title: string;
  runTimeMins: number | null;
  subtitleFiles: SubtitleFile[];
}

export interface SubtitleFile {
  subtitleId: string;
  source: string;
  author: string | null;
  subtitles: SubtitleBlock[];
}

export interface SubtitleBlock {
  start: number;
  end: number;
  text: string;
}

export interface LoadOutput {
  movie: MovieWatch;
}
