import { Arg, Query, QueryResult } from "../types";
import { q } from "../types.internal";

/**
 * Returns a subset of a set, in the specified range.
 */
export function range<T>(start: Arg<T>, end: Arg<T>, set: Arg<T[]>): Query<QueryResult<T>[]> {
  return q.Range(set, start, end);
}
