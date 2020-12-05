import { Query, Arg, Iter, IterPayload } from "./types";
import { q } from "./types.internal";

export function take(num: Arg<number>): <I extends Iter<any>>(source: Arg<I>) => Query<I>;
export function take<I extends Iter<any>>(num: Arg<number>, source: Arg<I>): Query<I>;
export function take<I extends Iter<any>>(num: Arg<number>, source?: Arg<I>) {
  if (source !== undefined) return q.Take(num, source);
  return (source: Arg<IterPayload<I>>) => take(num, source);
}
