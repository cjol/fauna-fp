import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Replaces a portion of a string with another string.
 */

export function replaceStr(
  needle: Arg<string>,
  replacement: Arg<string>,
  haystack: Arg<string>
): Query<string> {
  return q.ReplaceStr(haystack, needle, replacement);
}
