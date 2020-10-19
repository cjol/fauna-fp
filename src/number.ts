import { Query, q } from './types';

// TODO: curry this (and allow inf entries?)
export const gte: (a: Query<number>, b: Query<number>) => Query<boolean> = (
  a,
  b
) => q.GTE(a, b) as any;
