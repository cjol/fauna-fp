import { Arg, Cursor, Page, Query, QueryResult, Ref } from './types';
import { q } from './types.internal';

export const get = <T = unknown>(ref: Arg<Ref<T>>) =>
  q.Get(ref) as Query<{
    ref: Ref<QueryResult<T>>;
    data: QueryResult<T>;
    ts: number;
  }>;

export const paginate = <T>(
  results: Arg<T>,
  opts: Arg<{ before?: Cursor; after?: Cursor; size?: number }> = {}
) => q.Paginate(results, opts) as Query<Page<QueryResult<T>>>;

/**
 * Retrieves a key based on its secret.
 */
export const keyFromSecret = <T = unknown>(secret: Arg<string>) =>
  q.KeyFromSecret(secret) as Query<QueryResult<T>>;

// select - defined in `object`
