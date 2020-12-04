import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Returns true if each value is greater than all following values.
 */

export function gt<T>(as: Arg<T[]>): Query<boolean> {
    return q.GT(as);
}
