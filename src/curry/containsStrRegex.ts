import * as fns from "../fns";
import { Arg } from "../types";

/**
 * Tests whether a string contains a specific pattern.
 */
export function containsStrRegex(pattern: Arg<string>) {
  return (haystack: Arg<string>) => fns.containsStrRegex(pattern, haystack);
}
