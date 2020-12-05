import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Converts a string into a case-normalized string.
 */

export function casefold(str: Arg<string>): Query<string> {
  return q.Casefold(str);
}
