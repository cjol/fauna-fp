import { Query, Arg, QueryResult } from "../types";
import { q } from "../types.internal";

export function difference<T>(diffs: Arg<T[]>[], source?: Arg<T[]>): Query<QueryResult<T>[]> {
  return q.Difference(source, ...diffs);
}
