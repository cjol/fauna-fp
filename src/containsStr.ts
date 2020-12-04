import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Tests whether a string contains a specific string.
 */
export function containsStr(needle: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function containsStr(needle: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function containsStr(needle: Arg<string>, haystack?: Arg<string>) {
    if (haystack === undefined)
        return (haystack: Arg<string>) => containsStr(needle, haystack);
    return q.ContainsStr(haystack, needle);
}
