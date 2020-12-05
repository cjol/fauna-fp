import { Query, Arg, QueryResult } from "./types";
import { q } from "./types.internal";

export function union<T>(...xs: Arg<T[]>[]): Query<QueryResult<T>[]> {
  return q.Union(...xs);
}
