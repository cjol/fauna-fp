import { Arg, Query, Ref } from './types';
import { q } from './types.internal';

/**
 * Returns true if a document has an event at a specific time.
 */

export function exists<O>(ref: Arg<Ref<O>>): Query<boolean> {
    return q.Exists(ref);
}
