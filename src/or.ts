import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Returns true if any value is true.
 */

export function or(...a: Arg<boolean>[]): Query<boolean> {
  return q.Or(...a);
}
