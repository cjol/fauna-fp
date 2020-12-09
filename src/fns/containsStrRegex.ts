import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Tests whether a string contains a specific pattern.
 */
export function containsStrRegex(pattern: Arg<string>, haystack: Arg<string>): Query<boolean> {
  return q.ContainsStrRegex(haystack, pattern);
}
