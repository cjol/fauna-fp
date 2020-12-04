import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Tests whether a string starts with  specific string.
 */
export function startsWith(needle: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function startsWith(needle: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function startsWith(needle: Arg<string>, haystack?: Arg<string>) {
    if (haystack === undefined)
        return (haystack: Arg<string>) => startsWith(needle, haystack);
    return q.StartsWith(haystack, needle);
}
