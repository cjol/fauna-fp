import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Tests whether a string ends with a specific string.
 */
export function endsWith(needle: Arg<string>, haystack?: Arg<string>): Query<boolean> {
  return q.EndsWith(haystack, needle);
}
