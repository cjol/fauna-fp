import { Arg, Query, QueryResult, Ref } from "./types";
import { q } from "./types.internal";

export function get<T = unknown>(ref: Arg<Ref<T>>): Query<GetResult<T>> {
  return q.Get(ref);
}
interface GetResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: number;
}
