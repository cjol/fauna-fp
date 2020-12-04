import {
    Arg,

    Callback,
    Index,
    Query,
    QueryResult
} from './types';
import { q } from './types.internal';

// TODO: be more precise about the difference between a Set and an Array
// All: defined in array
// Any: defined in array
// Count: defined in array
// Difference: defined in array
// Distinct: defined in array
// Events: TODO
// Filter: defined in array
// Intersection: defined in array
// IsEmpty: defined in array
// IsNonEmpty: defined in array
/**
 * Combines the items in a set with set’s indexed values.
 */

export function join<O, T extends any[]>(detail: Arg<Index<T, O> | Callback<T, O>>): (source: Arg<T[]>) => Query<QueryResult<O>[]>;
export function join<O, T extends any[]>(detail: Arg<Index<T, O> | Callback<T, O>>, source: Arg<T[]>): Query<QueryResult<O>[]>;
export function join<O, T extends any[]>(detail: Arg<Index<T, O> | Callback<T, O>>, source?: Arg<T[]>) {
    if (source === undefined)
        return (source: Arg<T[]>) => join(detail, source);
    return q.Join(source, detail);
}
