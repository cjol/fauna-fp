import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Returns the length in codepoints of a string.
 */
export function length(item: Arg<string>): Query<number> {
    return q.Length(item);
}
