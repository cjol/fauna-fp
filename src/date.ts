import { Arg, Query, Timestamp } from './types';
import { q } from './types.internal';

// TODO: time and date functions
export const now = () => q.Now() as Query<Timestamp>;

export const toSeconds = (x: Arg<Timestamp>) => q.ToSeconds(x) as Query<number>;

export const time = (x: Arg<string>) => q.Time(x) as Query<Timestamp>;
