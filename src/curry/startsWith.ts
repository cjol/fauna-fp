import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Tests whether a string starts with  specific string.
 */
export function startsWith(needle: Arg<string>) {
  return (haystack: Arg<string>) => fns.startsWith(needle, haystack);
}
