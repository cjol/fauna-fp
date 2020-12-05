import { Query, Arg, Iter } from "./types";
import { q } from "./types.internal";

export function take(num: Arg<number>): <I extends Iter>(source: Arg<I>) => Query<I>;
export function take<I extends Iter>(num: Arg<number>, source: Arg<I>): Query<I>;
export function take<I extends Iter>(num: Arg<number>, source?: Arg<I>) {
  if (source !== undefined) return q.Take(num, source);
  return (source: Arg<I>) => take(num, source);
}
