import { Query, Arg, Iter } from "../types";
import { q } from "../types.internal";

export function reverse<T extends Iter<unknown>>(x: Arg<T>) {
  return q.Reverse(x) as Query<T>;
}
