import { Query, Arg, QueryResult } from "../types";
import { q } from "../types.internal";

export function prepend<T>(x: Arg<T[]>, y: Arg<T[]>): Query<QueryResult<T>[]> {
  return q.Prepend(x, y);
}
