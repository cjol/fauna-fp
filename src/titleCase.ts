import { Arg, Query } from './types';
import { q } from './types.internal';

/**
 * Converts a string to use TitleCase.
 */
export function titleCase(x: Arg<string>): Query<string> {
    return q.TitleCase(x);
}
