import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Removes all whitespace from the end of a string.
 */
export function rTrim(x: Arg<string>): Query<string> {
  return q.RTrim(x);
}
