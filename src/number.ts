import { Query, q, Arg } from './types';

// TODO: curry this
export const add = (...as: Arg<number>[]) => (...bs: Arg<number>[]) =>
  q.Add(...as, ...bs) as Query<number>;
