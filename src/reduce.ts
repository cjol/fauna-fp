import { curry } from "ramda";
import { Query, Arg, Callback, QueryResult, Iter } from "./types";
import { q } from "./types.internal";

export function reduce<T, A>(
  f: Callback<[A, T], A>
): ((init: Arg<A>, source: Arg<Iter<T>>) => Query<QueryResult<A>>) &
  ((init: Arg<A>) => (source: Arg<Iter<T>>) => Query<QueryResult<A>>);
export function reduce<T, A>(
  f: Callback<[A, T], A>,
  init: Arg<A>
): (source: Arg<Iter<T>>) => Query<QueryResult<A>>;
export function reduce<T, A>(
  f: Callback<[A, T], A>,
  init: Arg<A>,
  source: Arg<Iter<T>>
): Query<QueryResult<A>>;
export function reduce<T, A>(f: Callback<[A, T], A>, init?: Arg<A>, source?: Arg<Iter<T>>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (init !== undefined) {
    if (source !== undefined) {
      return q.Reduce((curr: Query<A>, next: Query<T>) => f(curr, next), init, source);
    }
    return (source: Arg<Iter<T>>) => reduce(f, init, source);
  }
  return curry((init: Arg<A>, source: Arg<Iter<T>>) => reduce(f, init, source));
}
