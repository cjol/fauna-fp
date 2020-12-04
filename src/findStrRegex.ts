import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Searches for a regex pattern within a string.
 */
export function findStrRegex(needle: Arg<string>): (haystack: Arg<string>) => Query<FindStrRegexResult[]>;
export function findStrRegex(needle: Arg<string>, haystack: Arg<string>): Query<FindStrRegexResult[]>;
export function findStrRegex(needle: FindStrRegexParams): (haystack: Arg<string>) => Query<FindStrRegexResult[]>;
export function findStrRegex(needle: FindStrRegexParams, haystack: Arg<string>): Query<FindStrRegexResult[]>;
export function findStrRegex(maybeNeedle: Arg<string> | FindStrRegexParams, haystack?: Arg<string>) {
    const needle: FindStrRegexParams = (typeof maybeNeedle === "object" && "pattern" in maybeNeedle) ? maybeNeedle : { pattern: maybeNeedle };
    if (haystack === undefined)
        return (haystack: Arg<string>) => findStrRegex(needle, haystack);
    return q.FindStrRegex(haystack, needle.pattern, needle.start, needle.max_results);
}
interface FindStrRegexParams {
    pattern: Arg<string>;
    max_results?: Arg<string>;
    start?: Arg<number>;
}
interface FindStrRegexResult {
    start: number;
    end: number;
    data: string;
}
