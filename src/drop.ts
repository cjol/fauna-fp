import { Query, Arg, Iter } from "./types";
import { q } from "./types.internal";

export function drop(num: Arg<number>): <I extends Iter>(source: Arg<I>) => Query<I>;
export function drop<I extends Iter>(num: Arg<number>, source: Arg<I>): Query<I>;
export function drop<I extends Iter>(num: Arg<number>, source?: Arg<I>) {
  if (source !== undefined) return q.Drop(num, source);
  return (source: Arg<I>) => drop(num, source as Arg<I>);
}
