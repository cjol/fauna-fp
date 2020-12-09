import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Combines a list of strings into a single string using the given separator.
 */

export function concatSep(sep: Arg<string>) {
  return (strs: Arg<string[]>) => fns.concat(strs, sep);
}
