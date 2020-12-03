import { Arg, Query, q, Timestamp } from './types';

// TODO: time and date functions
export const now = () => q.Now() as Query<Timestamp>;

export const toSeconds = (x: Query<Timestamp>) =>
  q.ToSeconds(x) as Query<number>;
