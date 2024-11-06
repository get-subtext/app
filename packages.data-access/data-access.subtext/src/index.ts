import { SubTextDataAccess as SubTextDataAccessImpl } from './services/SubTextDataAccess';
import type { SubTextDataAccess } from './services/SubTextDataAccess.types';

export type * from './services/SubTextDataAccess.types';

export interface SubTextDataAccessOptions {
  config: {
    apiUrlBase: string;
  };
  fetch: (input: string | URL | globalThis.Request, init?: RequestInit) => Promise<Response>;
}

export class SubTextDataAccessFactory {
  private constructor() {}

  public static create({ config, fetch }: SubTextDataAccessOptions): SubTextDataAccess {
    return new SubTextDataAccessImpl(config.apiUrlBase, fetch);
  }
}
