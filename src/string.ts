import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Converts a string into a case-normalized string.
 */
export function casefold(str: Arg<string>): Query<string> {
  return q.Casefold(str);
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

/**
 * Combines a list of strings into a single string.
 */
export function concat(strs: Arg<string[]>): Query<string> {
  return q.Concat(strs);
}

/**
 * Tests whether a string contains a specific string.
 */
export function containsStr(needle: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function containsStr(needle: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function containsStr(needle: Arg<string>, haystack?: Arg<string>) {
  if (haystack === undefined) return (haystack: Arg<string>) => containsStr(needle, haystack)
  return q.ContainsStr(haystack, needle);
}

/**
 * Tests whether a string contains a specific pattern.
 */
export function containsStrRegex(pattern: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function containsStrRegex(pattern: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function containsStrRegex(pattern: Arg<string>, haystack?: Arg<string>) {
  if (haystack === undefined) return (haystack: Arg<string>) => containsStrRegex(pattern, haystack)
  return q.ContainsStrRegex(haystack, pattern);
}

/**
 * Tests whether a string ends with a specific string.
 */
export function endsWith(needle: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function endsWith(needle: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function endsWith(needle: Arg<string>, haystack?: Arg<string>) {
  if (haystack === undefined) return (haystack: Arg<string>) => endsWith(needle, haystack)
  return q.EndsWith(haystack, needle);
}


interface FindStrParams {
  find: Arg<string>;
  start?: Arg<number>
}
/**
 * Searches for a string within a string.
 */
export function findStr(needle: Arg<string>): (haystack: Arg<string>) => Query<number>;
export function findStr(needle: Arg<string>, haystack: Arg<string>): Query<number>;
export function findStr(needle: FindStrParams): (haystack: Arg<string>) => Query<number>;
export function findStr(needle: FindStrParams, haystack: Arg<string>): Query<number>;
export function findStr(maybeNeedle: Arg<string> | FindStrParams, haystack?: Arg<string>) {
  const needle: FindStrParams = (typeof maybeNeedle === "object" && "find" in maybeNeedle) ? maybeNeedle : { find: maybeNeedle }
  if (haystack === undefined) return (haystack: Arg<string>) => findStr(needle, haystack)
  return q.FindStr(haystack, needle.find, needle.start);
}

interface FindStrRegexParams {
  pattern: Arg<string>;
  max_results?: Arg<string>;
  start?: Arg<number>
}
interface FindStrRegexResult {
  start: number;
  end: number;
  data: string;
}
/**
 * Searches for a regex pattern within a string.
 */
export function findStrRegex(needle: Arg<string>): (haystack: Arg<string>) => Query<FindStrRegexResult[]>;
export function findStrRegex(needle: Arg<string>, haystack: Arg<string>): Query<FindStrRegexResult[]>;
export function findStrRegex(needle: FindStrRegexParams): (haystack: Arg<string>) => Query<FindStrRegexResult[]>;
export function findStrRegex(needle: FindStrRegexParams, haystack: Arg<string>): Query<FindStrRegexResult[]>;
export function findStrRegex(maybeNeedle: Arg<string> | FindStrRegexParams, haystack?: Arg<string>) {
  const needle: FindStrRegexParams = (typeof maybeNeedle === "object" && "pattern" in maybeNeedle) ? maybeNeedle : { pattern: maybeNeedle }
  if (haystack === undefined) return (haystack: Arg<string>) => findStrRegex(needle, haystack)
  return q.FindStrRegex(haystack, needle.pattern, needle.start, needle.max_results);
}

/**
 * Formats arguments as a string according to a string of format specifiers.
 */
// TODO: consider using TS 4.1 template literal types to derive a correct type for the param array
export function format(fmt: Arg<string>): (x: Arg<Array<unknown>>) => Query<string>;
export function format(fmt: Arg<string>, x: Arg<Array<unknown>>): Query<string>;
export function format(fmt: Arg<string>, x?: Arg<Array<unknown>>) {
  if (x === undefined) return (x: Arg<Array<unknown>>) => format(fmt, x)
  return q.Format(fmt, x);
}

/**
 * Removes all whitespace from the start of a string.
 */
export function lTrim(x: Arg<string>): Query<string> {
  return q.LTrim(x);
}

/**
 * Returns the length in codepoints of a string.
 */
export function length(item: Arg<string>): Query<number> {
  return q.Length(item);
}

/**
 * Converts a string to all lowercase.
 */
export function lowercase(x: Arg<string>): Query<string> {
  return q.LowerCase(x);
}

/**
 * Removes all whitespace from the end of a string.
 */
export function rTrim(x: Arg<string>): Query<string> {
  return q.RTrim(x);
}

/**
 * Creates a regular expression that matches the input string verbatim.
 */
export function regexEscape(x: Arg<string>): Query<string> {
  return q.RegexEscape(x);
}

/**
 * Creates a new string by repeating a string multiple times.
 */
export function repeat(n: Arg<number>): (x: Arg<string>) => Query<string>;
export function repeat(n: Arg<number>, x: Arg<string>): Query<string>;
export function repeat(n: Arg<number>, x?: Arg<string>) {
  if (x === undefined) return (x: Arg<string>) => repeat(n, x);
  return q.Repeat(x, n);
}

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
      if (haystack === undefined) return replaceStr(needle, replacement)
      return replaceStr(needle, replacement, haystack);
    }
  }
  if (haystack === undefined) return (haystack: Arg<string>) => replaceStr(needle, replacement, haystack);

  return q.ReplaceStr(haystack, needle, replacement);
}

/**
 * Replaces a pattern in a string with another string.
 */
export function replaceStrRegex(pattern: Arg<string>, replacement: Arg<string>, haystack: Arg<string>): Query<string>;
export function replaceStrRegex(pattern: Arg<string>, replacement: Arg<string>): (haystack: Arg<string>) => Query<string>;
export function replaceStrRegex(pattern: Arg<string>): (replacement: Arg<string>, haystack: Arg<string>) => Query<string>;
export function replaceStrRegex(pattern: Arg<string>): (replacement: Arg<string>) => (haystack: Arg<string>) => Query<string>;
export function replaceStrRegex(pattern: Arg<string>, replacement?: Arg<string>, haystack?: Arg<string>) {
  if (replacement === undefined) {
    return (replacement: Arg<string>, haystack?: Arg<string>) => {
      if (haystack === undefined) return replaceStrRegex(pattern, replacement)
      return replaceStrRegex(pattern, replacement, haystack);
    }
  }
  if (haystack === undefined) return (haystack: Arg<string>) => replaceStrRegex(pattern, replacement, haystack);

  return q.ReplaceStrRegex(haystack, pattern, replacement);
}

/**
 * Creates a whitespace string of the specified size.
 */
export function space(size: Arg<number>): Query<string> {
  return q.Space(size);
}

/**
 * Tests whether a string starts with  specific string.
 */
export function startsWith(needle: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function startsWith(needle: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function startsWith(needle: Arg<string>, haystack?: Arg<string>) {
  if (haystack === undefined) return (haystack: Arg<string>) => startsWith(needle, haystack)
  return q.StartsWith(haystack, needle);
}


interface SubstringParam {
  start: Arg<number>;
  length?: Arg<number>
}
/**
 * Returns a portion of a string.
 */
export function substring(start: SubstringParam): (x: Arg<string>) => Query<string>;
export function substring(start: Arg<number>): (x: Arg<string>) => Query<string>;
export function substring(start: SubstringParam, x: Arg<string>): Query<string>;
export function substring(start: Arg<number>, x: Arg<string>): Query<string>;
export function substring(maybeStart: Arg<number> | SubstringParam, x?: Arg<string>) {
  const start: SubstringParam =
    (typeof maybeStart === "object" && "start" in maybeStart) ? maybeStart : { start: maybeStart };
  if (x === undefined) return (x: Arg<string>) => substring(start, x);
  return q.SubString(x, start.start, start.length)
}

/**
 * Converts a string to use TitleCase.
 */
export function titleCase(x: Arg<string>): Query<string> {
  return q.TitleCase(x);
}

/**
 * Removes all whitespace from the start and end of a string.
 */
export function trim(x: Arg<string>): Query<string> {
  return q.Trim(x);
}

/**
 * Converts a string to all uppercase.
 */
export function upperCase(x: Arg<string>): Query<string> {
  return q.UpperCase(x);
}

export function toString(x: Arg): Query<string> {
  return q.ToString(x);
}
