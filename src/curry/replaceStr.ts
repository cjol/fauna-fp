import * as fns from "../fns";
import { Arg, Query } from "../types";

/**
 * Replaces a portion of a string with another string.
 */
export function replaceStr(
  needle: Arg<string>,
  replacement: Arg<string>
): (haystack: Arg<string>) => Query<string>;
export function replaceStr(
  needle: Arg<string>
): (replacement: Arg<string>) => (haystack: Arg<string>) => Query<string>;
export function replaceStr(needle: Arg<string>, replacement?: Arg<string>) {
  if (replacement === undefined) {
    return (replacement: Arg<string>) => replaceStr(needle, replacement);
  }
  return (haystack: Arg<string>) => fns.replaceStr(needle, replacement, haystack);
}
