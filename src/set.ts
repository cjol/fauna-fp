import { Arg, ArgTuple, Callback, Index, q, Query, Ref } from "./types";

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
export const join = <O, T extends any[]>(
  detail: Arg<Index<O, T> | Callback<T, O>>,
  source: Arg<T[]>
) => q.Join(source, detail) as Query<O[]>;

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
export const match = <T, I extends any[]>(
  index: Arg<Ref<Index<T, I>>>,
  terms: ArgTuple<I>
) => q.Match(index, ...terms) as Query<T>;

// Max: defined in array
// Mean: defined in array
// Min: defined in array

/**
 * Returns a subset of a set, in the specified range.
 */
export const range = <T>(start: Arg<T>, end: Arg<T>, set: Arg<T[]>) =>
  q.Range(set, start, end) as Query<T[]>;

// Reduce: defined in array
// Reverse: defined in array

// Singleton: TODO
export const singleton = <T>(item: Arg<T>) => q.Singleton(item) as Query<T[]>;

// Sum: defined in array
// Union: defined in array
