import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Combines a list of strings into a single string using the given separator.
 */
export function concat(strs: Arg<string[]>, sep?: Arg<string>): Query<string> {
  return q.Concat(strs, sep);
}
