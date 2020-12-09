import * as fns from "../fns";
import { Arg, Query } from "../types";

/**
 * Replaces a portion of a string with another string.
 */
export function replaceStrRegex(
  pattern: Arg<string>,
  replacement: Arg<string>
): (haystack: Arg<string>) => Query<string>;
export function replaceStrRegex(
  pattern: Arg<string>
): (replacement: Arg<string>) => (haystack: Arg<string>) => Query<string>;
export function replaceStrRegex(pattern: Arg<string>, replacement?: Arg<string>) {
  if (replacement === undefined) {
    return (replacement: Arg<string>) => replaceStrRegex(pattern, replacement);
  }
  return (haystack: Arg<string>) => fns.replaceStrRegex(pattern, replacement, haystack);
}
