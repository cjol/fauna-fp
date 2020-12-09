import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Searches for a string within a string.
 */
export function findStr(
  maybeNeedle: Arg<string> | FindStrParams,
  haystack: Arg<string>
): Query<number> {
  const needle: FindStrParams =
    typeof maybeNeedle === "object" && "find" in maybeNeedle ? maybeNeedle : { find: maybeNeedle };
  return q.FindStr(haystack, needle.find, needle.start);
}
interface FindStrParams {
  find: Arg<string>;
  start?: Arg<number>;
}
