import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Searches for a regex pattern within a string.
 */
export function findStrRegex(
  maybeNeedle: Arg<string> | FindStrRegexParams,
  haystack: Arg<string>
): Query<FindStrRegexResult[]> {
  const needle: FindStrRegexParams =
    typeof maybeNeedle === "object" && "pattern" in maybeNeedle
      ? maybeNeedle
      : { pattern: maybeNeedle };
  return q.FindStrRegex(haystack, needle.pattern, needle.start, needle.max_results);
}
export interface FindStrRegexParams {
  pattern: Arg<string>;
  max_results?: Arg<string>;
  start?: Arg<number>;
}
export interface FindStrRegexResult {
  start: number;
  end: number;
  data: string;
}
