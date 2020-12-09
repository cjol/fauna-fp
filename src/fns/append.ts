import { Query, Arg, QueryResult } from "../types";
import { q } from "../types.internal";

export function append<T>(x: Arg<T[]>, y: Arg<T[]>): Query<QueryResult<T>[]> {
  return q.Append(x, y);
}
