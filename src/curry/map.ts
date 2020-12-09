import * as fns from "../fns";
import { Arg, Callback, Iter, IterPayload, MapIterable, Query, QueryResult } from "../types";

export function map<I extends Iter<unknown>, O>(
  f: Callback<[IterPayload<I>], O>
): (source: Arg<I>) => Query<MapIterable<I, QueryResult<O>>>;
export function map<T, O>(
  f: Callback<[T], O>
): <I extends Iter<T>>(source: Arg<I>) => Query<MapIterable<I, QueryResult<O>>>;
export function map<I extends Iter<unknown>, O>(f: Callback<[IterPayload<I>], O>) {
  return (source: Arg<I>) => fns.map(f, source);
}
