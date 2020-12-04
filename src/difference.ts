import { Query, Arg, QueryResult } from './types';
import { q } from './types.internal';


export function difference<T>(diffs: Arg<T[]>[]): (source: Arg<T[]>) => Query<QueryResult<T>[]>;
export function difference<T>(diffs: Arg<T[]>[], source: Arg<T[]>): Query<QueryResult<T>[]>;
export function difference<T>(diffs: Arg<T[]>[], source?: Arg<T[]>) {
    if (source !== undefined)
        return q.Difference(source, ...diffs);
    return (source: Arg<T[]>) => difference(diffs, source);
}
