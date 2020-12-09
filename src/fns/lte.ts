import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Returns true if each value is less than, or equal to, all following values.
 */

export function lte<T>(as: Arg<T[]>): Query<boolean> {
  return q.LTE(as);
}
