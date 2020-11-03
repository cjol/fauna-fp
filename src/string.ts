import { Arg, Query, q } from './types';

/**
 * Converts a string into a case-normalized string.
 */
export const casefold = (str: Arg<string>) => q.Casefold(str) as Query<string>;

/**
 * Combines a list of strings into a single string.
 */
export const concat = (sep?: Arg<string>) => (strs: Arg<string[]>) =>
  q.Concat(strs, sep) as Query<string>;

/**
 * Tests whether a string contains a specific string.
 */
export const containsStr = (needle: Arg<string>) => (haystack: Arg<string>) =>
  q.ContainsStr(haystack, needle) as Query<boolean>;

/**
 * Tests whether a string contains a specific pattern.
 */
export const containsStrRegex = (pattern: Arg<string>) => (
  haystack: Arg<string>
) => q.ContainsStrRegex(haystack, pattern) as Query<boolean>;

/**
 * Tests whether a string ends with a specific string.
 */
export const endsWith = (needle: Arg<string>) => (haystack: Arg<string>) =>
  q.EndsWith(haystack, needle) as Query<boolean>;

/**
 * Searches for a string within a string.
 */
export const findStr = (needle: Arg<string>, start?: Arg<number>) => (
  haystack: Arg<string>
) => q.FindStr(haystack, needle, start) as Query<number>;

/**
 * Searches for a regex pattern within a string.
 */
export const findStrRegex = (
  pattern: Arg<string>,
  start?: Arg<number>,
  max_results?: Arg<number>
) => (haystack: Arg<string>) =>
  q.FindStr(haystack, pattern, start, max_results) as Query<
    { start: number; end: number; data: string }[]
  >;

/**
 * Formats arguments as a string according to a string of format specifiers.
 */
export const format = (format: Arg<string>) => (
  x: Arg<string> | Arg<Array<unknown>>
) => q.Format(format, x) as Query<string>;

/**
 * Removes all whitespace from the start of a string.
 */
export const lTrim = (x: Arg<string>) => q.LTrim(x) as Query<string>;

/**
 * Returns the length in codepoints of a string.
 */
export const length = (item: Arg<string>): Query<number> => q.Length(item);

/**
 * Converts a string to all lowercase.
 */
export const lowercase = (x: Arg<string>) => q.LowerCase(x) as Query<string>;

/**
 * Removes all whitespace from the end of a string.
 */
export const rTrim = (x: Arg<string>) => q.RTrim(x) as Query<string>;

/**
 * Creates a regular expression that matches the input string verbatim.
 */
export const regexEscape = (x: Arg<string>) =>
  q.RegexEscape(x) as Query<string>;

/**
 * Creates a new string by repeating a string multiple times.
 */
export const repeat = (n?: Arg<number>) => (x: Arg<string>) =>
  q.Repeat(x, n) as Query<string>;

/**
 * Replaces a portion of a string with another string.
 */
export const replaceStr = (needle: Arg<string>, replacement: Arg<string>) => (
  x: Arg<string>
) => q.ReplaceStr(x, needle, replacement);

/**
 * Replaces a pattern in a string with another string.
 */
export const replaceStrRegex = (
  pattern: Arg<string>,
  replacement: Arg<string>,
  firstOnly?: Arg<boolean>
) => (x: Arg<string>) => q.ReplaceStrRegex(x, pattern, replacement, firstOnly);

/**
 * Creates a whitespace string of the specified size.
 */
export const space = (size: Arg<number>) => q.Space(size) as Query<string>;

/**
 * Tests whether a string starts with  specific string.
 */
export const startsWith = (needle: Arg<string>) => (haystack: Arg<string>) =>
  q.StartsWith(haystack, needle) as Query<boolean>;

/**
 * Returns a portion of a string.
 */
export const substring = (start: Arg<number>, length?: Arg<number>) => (
  x: Arg<string>
) => q.SubString(x, start, length) as Query<string>;

/**
 * Converts a string to use TitleCase.
 */
export const titleCase = (x: Arg<string>) => q.TitleCase(x) as Query<string>;

/**
 * Removes all whitespace from the start and end of a string.
 */
export const trim = (x: Arg<string>) => q.Trim(x) as Query<string>;

/**
 * Converts a string to all uppercase.
 */
export const upperCase = (x: Arg<string>) => q.UpperCase(x) as Query<string>;
