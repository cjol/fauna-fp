import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Tests whether a string ends with a specific string.
 */
export function endsWith(needle: Arg<string>) {
  return (haystack: Arg<string>) => fns.endsWith(needle, haystack);
}
