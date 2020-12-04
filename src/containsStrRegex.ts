import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Tests whether a string contains a specific pattern.
 */
export function containsStrRegex(pattern: Arg<string>): (haystack: Arg<string>) => Query<boolean>;
export function containsStrRegex(pattern: Arg<string>, haystack: Arg<string>): Query<boolean>;
export function containsStrRegex(pattern: Arg<string>, haystack?: Arg<string>) {
    if (haystack === undefined)
        return (haystack: Arg<string>) => containsStrRegex(pattern, haystack);
    return q.ContainsStrRegex(haystack, pattern);
}
