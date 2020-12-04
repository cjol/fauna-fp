import { Query, Arg, Iter } from './types';
import { q } from './types.internal';

/**
 * Returns true if all values are true. Also see `and` for short-circuit evaluation
 */

export function all(b: Arg<Iter<boolean>>): Query<boolean> {
    return q.All(b);
}
