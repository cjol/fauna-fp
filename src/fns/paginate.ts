import { Arg, Cursor, Match, Page, Query, QueryResult } from "../types";
import { q } from "../types.internal";

export type ContentType<T> = T extends unknown[] ? T | Match<T, unknown> : T;

export function paginate<T>(
  opts: PaginationOpts,
  results: Arg<ContentType<T>>
): Query<Page<QueryResult<T>>> {
  return q.Paginate(results, opts);
}

interface PaginationOpts {
  before?: Arg<Cursor>;
  after?: Arg<Cursor>;
  size?: Arg<number>;
}
