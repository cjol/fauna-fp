import { Query, Arg, Callback, QueryResult, Iter } from "../types";
import { q } from "../types.internal";

export function reduce<T, A>(
  f: Callback<[A, T], A>,
  init: Arg<A>,
  source: Arg<Iter<T>>
): Query<QueryResult<A>> {
  return q.Reduce((curr: Query<A>, next: Query<T>) => f(curr, next), init, source);
}
