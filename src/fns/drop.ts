import { Query, Arg, Iter, QueryResult } from "../types";
import { q } from "../types.internal";
export function drop<I extends Iter>(num: Arg<number>, source?: Arg<I>): Query<QueryResult<I>> {
  return q.Drop(num, source);
}
