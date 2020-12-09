import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Creates a regular expression that matches the input string verbatim.
 */
export function regexEscape(x: Arg<string>): Query<string> {
  return q.RegexEscape(x);
}
