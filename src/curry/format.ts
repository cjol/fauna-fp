import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Formats arguments as a string according to a string of format specifiers.
 */
// TODO: consider using TS 4.1 template literal types to derive a correct type for the param array
export function format(fmt: Arg<string>) {
  return (x: Arg<Array<unknown>>) => fns.format(fmt, x);
}
