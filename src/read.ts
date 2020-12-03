import { Arg, Cursor, Page, q, Query, Ref } from './types';

export const get = <T = unknown>(ref: Arg<Ref<T>>) =>
  q.Get(ref) as Query<{ ref: Ref<T>; data: T; ts: number }>;

export const paginate = <T>(
  results: Arg<T>,
  opts: Arg<{ before?: Cursor; after?: Cursor; size?: number }> = {}
) => q.Paginate(results, opts) as Query<Page<T>>;

/**
 * Retrieves a key based on its secret.
 */
export const keyFromSecret = <T = unknown>(secret: Arg<string>) =>
  q.KeyFromSecret(secret) as Query<T>;

// select - defined in `object`
