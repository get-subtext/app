export interface MovieView {
  imdbId: string;
  title: string;
  releaseDate: string | null;
  releaseYear: string | null;
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

export interface Gateway {
  getRecentMovies: () => Promise<MovieView[]>;
  searchMovies: (query: string) => Promise<MovieView[]>;
  getMovie: (imdbId: string) => Promise<MovieView | null>;
  getMovieToWatch: (imdbId: string) => Promise<MovieWatch | null>;
  getMyListMovies: (userId: string) => Promise<MovieView[]>;
  addToMyList: (userId: string, imdbId: string) => Promise<void>;
  removeFromMyList: (userId: string, imdbId: string) => Promise<void>;
  submitMovieRequest: (requestId: string, userId: string, imdbId: string) => Promise<void>;
}
