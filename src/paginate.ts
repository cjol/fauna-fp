import { Arg, Cursor, Page, Query, QueryResult } from './types';
import { q } from './types.internal';


export function paginateOpts(opts: Arg<PaginationOpts>): <T>(results: Arg<T>) => Query<Page<QueryResult<T>>>;
export function paginateOpts<T>(opts: Arg<PaginationOpts>, results: Arg<T>): Query<Page<QueryResult<T>>>;
export function paginateOpts<T>(opts: Arg<PaginationOpts>, results?: Arg<T>) {
  return q.Paginate(results, opts);
}
export function paginate<T>(results: Arg<T>): Query<Page<QueryResult<T>>> {
  return q.Paginate(results);
}
interface PaginationOpts {
  before?: Cursor;
  after?: Cursor;
  size?: number;
}
