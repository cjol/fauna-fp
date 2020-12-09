import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Returns true of all values are equivalent.
 */

export function equals<O>(a: Arg<O>, b?: Arg<O>): Query<boolean> {
  return q.Equals(a, b);
}
