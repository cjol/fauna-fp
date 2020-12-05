import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns true if each value is greater than, or equal to, all following values.
 */

export function gte<T>(as: Arg<T[]>): Query<boolean> {
  return q.GTE(as);
}
