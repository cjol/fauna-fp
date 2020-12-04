import {
    Collection,
    Credentials,


    QueryResult
} from './types';
import { q } from './types.internal';

/**
 * Provides a reference to the internal credentials collection.
 */

export function credentials<I = unknown, D = unknown>(): Collection<Credentials<QueryResult<I>, QueryResult<D>>> {
    return q.Credentials();
}
