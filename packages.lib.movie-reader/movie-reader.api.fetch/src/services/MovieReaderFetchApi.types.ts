export interface MoviePage {
  pageNumber: number;
  pageCount: number;
  imdbIds: string[];
}

export interface Movie {
  imdbId: string;
  title: string;
  releaseDate: string | null;
  releaseYear: string | null;
  posterIds: string[];
  rated: string | null;
  genres: string[];
  directors: string[];
  writers: string[];
  actors: string[];
  runTimeMins: number | null;
  plot: string | null;
  subtitleFileIds: string[];
  isAvailable: boolean;
}

export interface Poster {
  posterId: string;
  source: {
    origin: string;
    url: string;
  };
  fileName: string;
}

export enum SourceTypeEnum {
  ZipFile = 'ZipFile',
  StandaloneFile = 'StandaloneFile',
}

export interface ZipFileSource {
  origin: string;
  type: SourceTypeEnum.ZipFile;
  author: string | null;
  url: string;
  zipFileName: string;
  textFileName: string;
}

export interface StandaloneFileSource {
  origin: string;
  type: SourceTypeEnum.StandaloneFile;
  author: string | null;
  url: string;
  textFileName: string;
}

export interface SubtitleFile {
  subtitleFileId: string;
  source: ZipFileSource | StandaloneFileSource;
  subtitles: string[];
}

export interface MovieReaderFetchApi {
  queryMovies: (pageNumber: number) => Promise<MoviePage | null>;
  getMovie: (imdbId: string) => Promise<Movie | null>;
  getPoster: (imdbId: string, posterId: string) => Promise<Poster | null>;
  getSubtitleFile: (imdbId: string, subtitleFileId: string) => Promise<SubtitleFile | null>;
}
