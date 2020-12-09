import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Removes all whitespace from the start and end of a string.
 */
export function trim(x: Arg<string>): Query<string> {
  return q.Trim(x);
}
