import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Removes all whitespace from the start of a string.
 */
export function lTrim(x: Arg<string>): Query<string> {
  return q.LTrim(x);
}
