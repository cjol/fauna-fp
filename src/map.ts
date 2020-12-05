import { Query, Arg, Callback, QueryResult, MapIterable, Iter, IterPayload } from "./types";
import { q } from "./types.internal";

export function map<I extends Iter<any>, O>(
  f: Callback<[IterPayload<I>], O>
): (source: Arg<I>) => Query<MapIterable<I, QueryResult<O>>>;
export function map<T, O>(f: Callback<[T], O>): <I extends Iter<T>>(source: Arg<I>) => Query<MapIterable<I, QueryResult<O>>>;
export function map<I extends Iter<any>, O>(
  f: Callback<[IterPayload<I>], O>,
  source: Arg<I>
): Query<MapIterable<I, QueryResult<O>>>;
export function map<I extends Iter<any>, O>(f: Callback<[IterPayload<I>], O>, source?: Arg<I>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (source !== undefined) return q.Map(source, (item: Query<IterPayload<I>>) => f(item));
  return (source: Arg<IterPayload<I>>) => map(f, source);
}
