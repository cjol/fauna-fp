import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Tests whether a string contains a specific string.
 */
export function containsStr(needle: Arg<string>, haystack: Arg<string>): Query<boolean> {
  return q.ContainsStr(haystack, needle);
}
