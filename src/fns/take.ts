import { Query, Arg, Iter } from "../types";
import { q } from "../types.internal";

export function take<I extends Iter>(num: Arg<number>, source: Arg<I>): Query<I> {
  return q.Take(num, source);
}
