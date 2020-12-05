import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Creates a whitespace string of the specified size.
 */
export function space(size: Arg<number>): Query<string> {
  return q.Space(size);
}
