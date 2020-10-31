import { Arg, Cursor, Page, q, Query, Ref, Result } from './types';

export const get: <T = unknown>(r: Arg<Ref<T>>) => Query<T> = (name) =>
  q.Get(name);

export const paginate = (
  opts: Arg<{ before?: Cursor; after?: Cursor; size?: number }> = {}
) => <T = unknown>(results: Arg<Ref<T>>): Query<Page<Result<T>>> =>
  q.Paginate(results, opts);

export const keyFromSecret = <T = unknown>(secret: Arg<string>) =>
  q.KeyFromSecret(secret) as Query<T>;

// select - defined in `object`
