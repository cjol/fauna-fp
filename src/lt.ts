import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns true if each value is less than all following values.
 */

export function lt<T>(as: Arg<T[]>): Query<boolean> {
  return q.LT(as);
}
