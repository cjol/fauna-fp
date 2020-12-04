import { Arg, Query, Timestamp } from './types';
import { q } from './types.internal';

export function now(): Query<Timestamp> {
    return q.Now();
}

export function toSeconds(x: Arg<Timestamp>): Query<number> {
    return q.ToSeconds(x);
}

export function time(x: Arg<string>): Query<Timestamp> {
    return q.Time(x);
}
