import { Arg, Query, QueryResult } from "./types";
import { q } from "./types.internal";

export function toArray<A extends Record<string, unknown>>(
  obj: Arg<A>
): Query<Entries<QueryResult<A>>> {
  return q.ToArray(obj);
}
type Entries<T> = {
  [K in keyof T]: [K, T[K]];
}[keyof T][];
