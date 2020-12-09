import { Arg, Query } from "../types";
import { q } from "../types.internal";

interface SubstringParam {
  start: Arg<number>;
  length?: Arg<number>;
}
/**
 * Returns a portion of a string.
 */
export function substring(start: SubstringParam, x: Arg<string>): Query<string> {
  return q.SubString(x, start.start, start.length);
}
