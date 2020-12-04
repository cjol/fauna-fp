import { Arg, Cursor, Page, Query, QueryResult, Ref } from './types';
import { q } from './types.internal';
interface GetResult<T> {
  ref: Ref<QueryResult<T>>;
  data: QueryResult<T>;
  ts: number;
}

export function get<T = unknown>(ref: Arg<Ref<T>>): Query<GetResult<T>> {
  return q.Get(ref);
}

interface PaginationOpts {
  before?: Cursor;
  after?: Cursor;
  size?: number;
}

export function paginateOpts(opts: Arg<PaginationOpts>): <T>(results: Arg<T>) => Query<Page<QueryResult<T>>>
export function paginateOpts<T>(opts: Arg<PaginationOpts>, results: Arg<T>): Query<Page<QueryResult<T>>>
export function paginateOpts<T>(opts: Arg<PaginationOpts>, results?: Arg<T>) {
  return q.Paginate(results, opts);
}
export function paginate<T>(results: Arg<T>): Query<Page<QueryResult<T>>> {
  return q.Paginate(results);
}

/**
 * Retrieves a key based on its secret.
 */
export function keyFromSecret<T = unknown>(secret: Arg<string>): Query<QueryResult<T>> {
  return q.KeyFromSecret(secret);
}

// select - defined in `object`
