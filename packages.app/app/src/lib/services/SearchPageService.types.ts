export interface LoadOutputRecentMovie {
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

export interface LoadOutput {
  movies: LoadOutputRecentMovie[];
}

export interface SearchOutput {
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
