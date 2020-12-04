import { Arg, Query, QueryResult } from './types';
import { q } from './types.internal';

/**
 * Retrieves a key based on its secret.
 */

export function keyFromSecret<T = unknown>(secret: Arg<string>): Query<QueryResult<T>> {
    return q.KeyFromSecret(secret);
}
