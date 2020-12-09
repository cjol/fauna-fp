import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Replaces a pattern in a string with another string.
 */
export function replaceStrRegex(
  pattern: Arg<string>,
  replacement: Arg<string>,
  haystack: Arg<string>
): Query<string> {
  return q.ReplaceStrRegex(haystack, pattern, replacement);
}
