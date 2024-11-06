import { SubTextDataAccess as SubTextDataAccessImpl } from './services/SubTextDataAccess';
import type { SubTextDataAccess } from './services/SubTextDataAccess.types';

export type * from './services/SubTextDataAccess.types';

export interface SubTextDataAccessOptions {
  config: {
    apiUrlBase: string;
  };
}

export class SubTextDataAccessFactory {
  private constructor() {}

  public static create({ config }: SubTextDataAccessOptions): SubTextDataAccess {
    return new SubTextDataAccessImpl(config.apiUrlBase);
  }
}
