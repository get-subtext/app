import { SubTextApi as SubTextApiImpl } from './services/SubTextApi';
import type { SubTextApi } from './services/SubTextApi.types';

export type * from './services/SubTextApi.types';

export interface SubTextApiOptions {
  config: {
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class SubTextApiFactory {
  private constructor() {}

  public static create({ config, fetch }: SubTextApiOptions): SubTextApi {
    return new SubTextApiImpl(config.apiUrlBase, fetch);
  }
}
