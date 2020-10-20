import { Query, q, Arg } from './types';

// TODO: curry this (and allow inf entries?)
export const gte: (a: Query<number>, b: Query<number>) => Query<boolean> = (
  a,
  b
) => q.GTE(a, b) as any;

// TODO: curry this
export const add = (...as: Arg<number>[]) => (...bs: Arg<number>[]) =>
  q.Add(...as, ...bs) as Query<number>;
