import { Arg, Query, QueryResult } from "../types";
import { q } from "../types.internal";

// Reduce: defined in array
// Reverse: defined in array

export function singleton<T>(item: Arg<T>): Query<QueryResult<T>[]> {
  return q.Singleton(item);
}
