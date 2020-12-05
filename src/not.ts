import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns the opposite of a boolean expression.
 */

export function not(b: Arg<boolean>): Query<boolean> {
  return q.Not(b);
}
