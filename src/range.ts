import {
    Arg,
    Query,
    QueryResult
} from './types';
import { q } from './types.internal';

// Max: defined in array
// Mean: defined in array
// Min: defined in array
/**
 * Returns a subset of a set, in the specified range.
 */

export function range<T>(start: Arg<T>):
    ((end: Arg<T>, set: Arg<T[]>) => Query<QueryResult<T>[]>) &
    ((end: Arg<T>) => (set: Arg<T[]>) => Query<QueryResult<T>[]>);
export function range<T>(start: Arg<T>, end: Arg<T>): (set: Arg<T[]>) => Query<QueryResult<T>[]>;
export function range<T>(start: Arg<T>, end: Arg<T>, set: Arg<T[]>): Query<QueryResult<T>[]>;
export function range<T>(start: Arg<T>, end?: Arg<T>, set?: Arg<T[]>) {
    if (end === undefined)
        return (end: Arg<T>, set?: Arg<T[]>) => set === undefined ? range(start, end) : range(start, end, set);
    if (set === undefined)
        return (set: Arg<T[]>) => range(start, end, set);
    return q.Range(set, start, end);
}
