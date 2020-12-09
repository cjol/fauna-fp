import { Arg, Match, Query, Ref, QueryResult } from "../types";
import { q } from "../types.internal";

export function get<T = unknown>(ref: Arg<Ref<T>>): Query<QueryResult<T>>;
export function get<T = unknown>(ref: Arg<Match<unknown[], T>>): Query<QueryResult<T>>;
export function get<T = unknown>(ref: Arg<Match<unknown[], T> | Ref<T>>): Query<QueryResult<T>> {
  return q.Get(ref);
}
