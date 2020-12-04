import { Arg, Query } from './types';
import { q } from './types.internal';

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
            if (haystack === undefined)
                return replaceStrRegex(pattern, replacement);
            return replaceStrRegex(pattern, replacement, haystack);
        };
    }
    if (haystack === undefined)
        return (haystack: Arg<string>) => replaceStrRegex(pattern, replacement, haystack);

    return q.ReplaceStrRegex(haystack, pattern, replacement);
}
