import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Combines a list of strings into a single string.
 */
export function concat(strs: Arg<string[]>): Query<string> {
  return q.Concat(strs);
}

/**
 * Combines a list of strings into a single string using the given separator.
 */

export function concatSep(sep: Arg<string>): (strs: Arg<string[]>) => Query<string>;
export function concatSep(sep: Arg<string>, strs: Arg<string[]>): Query<string>;
export function concatSep(sep: Arg<string>, strs?: Arg<string[]>) {
  if (strs === undefined) return (strs: Arg<string[]>) => concatSep(sep, strs);
  return q.Concat(strs, sep);
}
