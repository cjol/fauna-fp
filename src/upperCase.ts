import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Converts a string to all uppercase.
 */
export function upperCase(x: Arg<string>): Query<string> {
    return q.UpperCase(x);
}
