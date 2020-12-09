import { Query, Arg, QueryResult } from "../types";
import { q } from "../types.internal";

export function toObject<T>(entries: Arg<[string, T][]>): Query<Record<string, QueryResult<T>>> {
  return q.ToObject(entries);
}
