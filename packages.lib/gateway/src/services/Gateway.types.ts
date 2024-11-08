export interface MovieDetails {
  imdbId: string;
  title: string;
  releaseDate: string | null;
  releaseYear: number | null;
  posterUrl: string | null;
  rated: string | null;
  genres: string[];
  directors: string[];
  writers: string[];
  actors: string[];
  runTimeMins: number | null;
  plot: string | null;
  subtitleCount: number;
  isOnMyList: boolean;
}

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

export interface SubmitRequestOutputFoundMovie {
  imdbId: string;
  title: string;
  releaseDate: string | null;
  releaseYear: number | null;
  posterUrl: string | null;
  rated: string | null;
  genres: string[];
  directors: string[];
  writers: string[];
  actors: string[];
  runTimeMins: number | null;
  plot: string | null;
  subtitleCount: number;
  isOnMyList: boolean;
}

export interface Gateway {
  getRecentMovies(): Promise<MovieDetails[]>;
  searchMovies(query: string): Promise<MovieDetails[]>;
  getMovie(imdbId: string): Promise<MovieDetails | null>;
  getMovieToWatch(imdbId: string): Promise<MovieWatch | null>;
  getMyListMovies(): Promise<MovieDetails[]>;
  addToMyList(imdbId: string): Promise<void>;
  removeFromMyList(imdbId: string): Promise<void>;
  submitMovieRequest(requestId: string, imdbId: string): Promise<void>;
}
