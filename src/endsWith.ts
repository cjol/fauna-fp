import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Tests whether a string ends with a specific string.
 */
export function endsWith(needle: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function endsWith(needle: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function endsWith(needle: Arg<string>, haystack?: Arg<string>) {
    if (haystack === undefined)
        return (haystack: Arg<string>) => endsWith(needle, haystack);
    return q.EndsWith(haystack, needle);
}
