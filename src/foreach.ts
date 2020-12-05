import { Query, Arg, Callback, Iter, IterPayload } from "./types";
import { q } from "./types.internal";

export function foreach<I extends Iter<any>>(f: Callback<[IterPayload<I>], any>): (source: Arg<I>) => Query<I>;
export function foreach<T>(f: Callback<[T], any>): <I extends Iter<T>>(source: Arg<I>) => Query<I>;
export function foreach<I extends Iter<any>>(f: Callback<[IterPayload<I>], any>, source: Arg<I>): Query<I>;
export function foreach<I extends Iter<any>>(f: Callback<[IterPayload<I>], any>, source?: Arg<I>) {
  // manually create a callback so that fauna driver can parse the param name more easily
  if (source !== undefined) return q.Foreach(source, (item: Query<IterPayload<I>>) => f(item));
  return (source: Arg<IterPayload<I>>) => foreach(f, source);
}
