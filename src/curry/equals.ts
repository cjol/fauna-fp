import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Returns true of all values are equivalent.
 */
export function equals<O>(a: Arg<O>) {
  return (b: Arg<O>) => fns.equals(a, b);
}
