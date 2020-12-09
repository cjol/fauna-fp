import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Converts a string to all lowercase.
 */
export function lowercase(x: Arg<string>): Query<string> {
  return q.LowerCase(x);
}
