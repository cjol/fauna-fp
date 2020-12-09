import { Arg, Query } from "../types";
import { q } from "../types.internal";

/**
 * Creates a new string by repeating a string multiple times.
 */
export function repeat(n: Arg<number>, x: Arg<string>): Query<string> {
  return q.Repeat(x, n);
}
