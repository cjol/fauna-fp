import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Creates a new string by repeating a string multiple times.
 */
export function repeat(n: Arg<number>) {
  return (x: Arg<string>) => fns.repeat(n, x);
}
