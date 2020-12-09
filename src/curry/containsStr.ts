import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Tests whether a string contains a specific string.
 */
export function containsStr(needle: Arg<string>) {
  return (haystack: Arg<string>) => fns.containsStr(needle, haystack);
}
