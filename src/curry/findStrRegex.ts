import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Searches for a regex pattern within a string.
 */
export function findStrRegex(maybeNeedle: Arg<string> | FindStrRegexParams) {
  const needle: FindStrRegexParams =
    typeof maybeNeedle === "object" && "pattern" in maybeNeedle
      ? maybeNeedle
      : { pattern: maybeNeedle };
  return (haystack: Arg<string>) => fns.findStrRegex(needle, haystack);
}
interface FindStrRegexParams {
  pattern: Arg<string>;
  max_results?: Arg<string>;
  start?: Arg<number>;
}
