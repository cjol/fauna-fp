import {
  Arg,
  ArgTuple,
  Callback,
  Index,
  Query,
  QueryResult,
  Ref,
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
export function join<O, T extends any[]>(detail: Arg<Index<T, O> | Callback<T, O>>): (source: Arg<T[]>) => Query<QueryResult<O>[]>
export function join<O, T extends any[]>(detail: Arg<Index<T, O> | Callback<T, O>>, source: Arg<T[]>): Query<QueryResult<O>[]>
export function join<O, T extends any[]>(detail: Arg<Index<T, O> | Callback<T, O>>, source?: Arg<T[]>) {
  if (source === undefined) return (source: Arg<T[]>) => join(detail, source);
  return q.Join(source, detail);
}

/**
 * The `Match` function finds the "search terms" provided to `Match` in the
 * requested index. The `search_terms` must be identical to the terms in the
 * index, including both the value of all terms and number of terms. If the
 * index is configured with no terms, then the `search_terms` argument should be
 * omitted. If the index is configured with multiple terms, then the "search
 * terms" should be an array of values.
 *
 * When calling `Match` through `Paginate`, the results are returned as an array of
 * pages. If no matching element is found an empty collection is returned.
 *
 * If `Match` only returns a single document, or only the first document is
 * needed, `Get` may be used to retrieve the document.
 */
export function match<I extends any[], T>(index: Arg<Ref<Index<I, T>>>): (terms: ArgTuple<I>) => Query<T>;
export function match<I extends any[], T>(index: Arg<Ref<Index<I, T>>>, terms: ArgTuple<I>): Query<T>;
export function match<I extends any[], T>(index: Arg<Ref<Index<I, T>>>, terms?: ArgTuple<I>) {
  if (terms === undefined) return (terms: ArgTuple<I>) => match(index, terms);
  return q.Match(index, ...terms);
}

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
  if (end === undefined) return (end: Arg<T>, set?: Arg<T[]>) => set === undefined ? range(start, end) : range(start, end, set);
  if (set === undefined) return (set: Arg<T[]>) => range(start, end, set);
  return q.Range(set, start, end);
}

// Reduce: defined in array
// Reverse: defined in array

// Singleton: TODO
export function singleton<T>(item: Arg<T>): Query<QueryResult<T>[]> {
  return q.Singleton(item);
}

// Sum: defined in array
// Union: defined in array
