import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Tests whether a string starts with  specific string.
 */
export function startsWith(needle: Arg<string>, haystack: Arg<string>): Query<boolean> {
  return q.StartsWith(haystack, needle);
}
