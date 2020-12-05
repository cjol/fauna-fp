import { Arg, Query } from "./types";
import { q } from "./types.internal";

/**
 * Searches for a string within a string.
 */
export function findStr(needle: Arg<string>): (haystack: Arg<string>) => Query<number>;
export function findStr(needle: Arg<string>, haystack: Arg<string>): Query<number>;
export function findStr(needle: FindStrParams): (haystack: Arg<string>) => Query<number>;
export function findStr(needle: FindStrParams, haystack: Arg<string>): Query<number>;
export function findStr(maybeNeedle: Arg<string> | FindStrParams, haystack?: Arg<string>) {
  const needle: FindStrParams = typeof maybeNeedle === "object" && "find" in maybeNeedle ? maybeNeedle : { find: maybeNeedle };
  if (haystack === undefined) return (haystack: Arg<string>) => findStr(needle, haystack);
  return q.FindStr(haystack, needle.find, needle.start);
}
interface FindStrParams {
  find: Arg<string>;
  start?: Arg<number>;
}
