import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Replaces a portion of a string with another string.
 */
export function replaceStr(needle: Arg<string>, replacement: Arg<string>, haystack: Arg<string>): Query<string>;
export function replaceStr(needle: Arg<string>, replacement: Arg<string>): (haystack: Arg<string>) => Query<string>;
export function replaceStr(needle: Arg<string>): (replacement: Arg<string>, haystack: Arg<string>) => Query<string>;
export function replaceStr(needle: Arg<string>): (replacement: Arg<string>) => (haystack: Arg<string>) => Query<string>;
export function replaceStr(needle: Arg<string>, replacement?: Arg<string>, haystack?: Arg<string>) {
  if (replacement === undefined) {
    return (replacement: Arg<string>, haystack?: Arg<string>) => {
      if (haystack === undefined) return replaceStr(needle, replacement);
      return replaceStr(needle, replacement, haystack);
    };
  }
  if (haystack === undefined) return (haystack: Arg<string>) => replaceStr(needle, replacement, haystack);

  return q.ReplaceStr(haystack, needle, replacement);
}
