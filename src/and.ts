import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Returns true if all values are true. Does not handle collections, and short-circuits on false values. Also see `all`.
 */

export function and(...a: Arg<boolean>[]): Query<boolean> {
    return q.And(...a);
}
